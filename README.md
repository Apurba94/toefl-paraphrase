# Paraphrase Trainer

Pick the best paraphrase of a sentence, then write your own and check its overlap with the original.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the TOEFL iBT and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Paraphrase Trainer.exe` from the [latest release](https://github.com/Apurba94/toefl-paraphrase/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/toefl-paraphrase/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Paraphrasing, saying the same thing in new words, is central to reading questions and to good writing. Choose the best of four paraphrases for ten original sentences, then write your own paraphrase and see how much of the original wording you repeated.

Sections: Choose, Write, Progress, About.

## How to use it

1. In **Choose**, find the option that keeps the meaning, not the one that keeps the words.
2. In **Write**, rewrite the sentence in your own words. Change the structure, not just single words.
3. Aim to repeat fewer than half the original content words, while keeping the meaning.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
