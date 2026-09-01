# WEB OF TRUST

**Your spidey-sense for what's true.**

Paste a claim. Get a verdict before the rumor spreads.

[Live demo](https://weboftrust.netlify.app/) · [Trust report](https://weboftrust.netlify.app/analysis)

---

## The problem

Headlines, screenshots, and posts move faster than sources. By the time you look something up, it is already being forwarded.

## The product

WEB OF TRUST is an AI fact-checker with a spider-sense theme. You paste a headline, quote, or post. The app splits it into checkable assertions, traces each one toward sources, and returns **Verified**, **Mixed**, or **False** with a confidence score and a citation trail.

No account for the first check. Verdict in seconds.

---

## How it works

1. **Snag the claim** — paste a headline, quote, or post. The scanner breaks it into individual assertions.
2. **Trace every thread** — each fact is followed to a primary source, archive, or dataset. Dead links and repost chains get flagged.
3. **Sling the verdict** — one label you can forward: Verified, Mixed, or False, plus the trail behind it.

Live model label in the UI: `sense-v3`.

---

## What judges will see

**Home** — [weboftrust.netlify.app](https://weboftrust.netlify.app/)

| Section | What it does |
| --- | --- |
| Hero + scanner | Paste a claim, run a fast check, or open the full report |
| Caught in the web | Recent checks with verdict + confidence |
| How it works | The three-step loop above |
| The creed | “With great facts come great responsibility.” Free first check, no signup wall |

**Report** — [weboftrust.netlify.app/analysis](https://weboftrust.netlify.app/analysis)

| Block | What it shows |
| --- | --- |
| Summary | Model confidence, sources for / against, overall trail label |
| Evidence web | 6 signals: credibility, primary evidence, cross-verification, chain integrity, recency, language |
| Trust over spread | Whether the rumor is outrunning the evidence |
| Source trail | Each source marked supports / neutral / contradicts |

Example recent checks on the live home page: a “8 glasses of water a day” claim marked False, a JWST image claim marked Verified, an e-scooter ban claim marked Mixed.

---

## Verdicts

| Label | Meaning |
| --- | --- |
| **Verified** | The claim lines up with the traced sources |
| **Mixed** | Partly true, contested, or incomplete |
| **False** | Conflicts with the evidence, or sits on a weak trail |

Confidence is a model score, not a court ruling. Read the trail before sharing the stamp.

---

## Tech

React + Vite single-page app, React Router (`/` and `/analysis`), Tailwind-style UI, hosted on Netlify.

```bash
npm install
npm run dev
