/* Paraphrase Trainer: pick the best paraphrase, then write your own and check how close it is to the original. */
(function () {
  'use strict';
  // Share of the original's content words that a paraphrase repeats. Above about 60% is copying, not paraphrasing.
  const STOP = new Set('the a an and or of to in on at by for with from as is are was were be been it its this that these those has have had will would can could not no so than then there their they he she we you i'.split(' '));
  const overlap = (orig, para) => {
    const a = SK.text.words(orig).map((w) => w.toLowerCase()).filter((w) => !STOP.has(w));
    const b = new Set(SK.text.words(para).map((w) => w.toLowerCase()));
    return a.length ? SK.round(a.filter((w) => b.has(w)).length / a.length, 2) : 0;
  };
  const App = {
    about: 'Paraphrasing, saying the same thing in new words, is central to reading questions and to good writing. Choose the best of four paraphrases for ten original sentences, then write your own paraphrase and see how much of the original wording you repeated.',
    how: ['In **Choose**, find the option that keeps the meaning, not the one that keeps the words.', 'In **Write**, rewrite the sentence in your own words. Change the structure, not just single words.', 'Aim to repeat fewer than half the original content words, while keeping the meaning.'],
    tabs: [
      SK.bankTab('choose', 'Choose', (ctx) => ctx.data.paraphrase, { sizes: [5, 10] }),
      { id: 'write', label: 'Write', render(el, ctx) {
        const x = SK.pick(SK.rng(SK.seedNow()), ctx.data.paraphrase);
        const orig = x.stem.replace(/^Original:\s*/, '');
        const area = SK.h('textarea', { style: { minHeight: '80px' }, 'aria-label': 'Your paraphrase', placeholder: 'Your paraphrase' });
        const out = SK.h('div', {});
        el.appendChild(SK.card('Write your own paraphrase', SK.h('div', { class: 'sk-passage', text: orig }), SK.h('div', { style: { marginTop: '10px' } }, area),
          SK.h('div', { class: 'sk-row', style: { marginTop: '10px' } }, SK.btn('Check', () => {
            SK.clear(out);
            const o = overlap(orig, area.value);
            out.appendChild(SK.note('You repeated ' + Math.round(o * 100) + '% of the original content words. ' + (o > 0.75 ? 'That is close to copying: change the structure. Key terms such as names, numbers and technical words can stay.' : o < 0.15 ? 'Very different wording: check the meaning is still the same.' : 'A good range. Check the meaning matches.'), o > 0.75 ? 'wrong' : 'info'));
            out.appendChild(SK.note('One good paraphrase: ' + x.choices[x.answer]));
          }, '', { 'data-auto': 'once' }), SK.btn('Another sentence', () => SK.show('write'), 'ghost')), out));
      } },
    ],
    overlap,
    checks: {
      'copying scores high and the model paraphrases score lower': (data, assert) => {
        const scores = data.paraphrase.map((x) => { const o = x.stem.replace(/^Original:\s*/, ''); assert.equal(overlap(o, o), 1); return overlap(o, x.choices[x.answer]); });
        assert.ok(SK.sum(scores) / scores.length < 0.6, 'model paraphrases reuse well under the original wording on average');
        for (const it of data.paraphrase) assert.deepEqual(SK.validateItem(it), []);
      },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
