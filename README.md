# WEB OF TRUST

**Your spidey-sense for what's true.**

An AI fact-checker that reads a claim, traces the source trail, and returns a verdict before the rumor spreads.

**Demo:** [weboftrust.netlify.app](https://weboftrust.netlify.app/)  
**Report:** [weboftrust.netlify.app/analysis](https://weboftrust.netlify.app/analysis)

---

## Why

Rumors travel as screenshots. Sources do not. WEB OF TRUST is a first-pass checker for a headline, quote, or post — fast enough to use before you share it, detailed enough that the answer is not just a color.

## What it does

Paste a claim. The scanner splits it into checkable assertions, traces each one toward a primary source, archive, or dataset, and slings back **Verified**, **Mixed**, or **False** with confidence and a citation trail.

- No account on the first check
- Live scanner labeled `sense-v3`
- Dead links and repost chains get flagged
- Full report breaks the score into evidence signals, not one opaque number

---

## How a check works

1. **Snag the claim** — paste a headline, quote, or post. Vague numbers cannot hide inside a longer sentence.
2. **Trace every thread** — follow each assertion to a source. Flag weak chains.
3. **Sling the verdict** — one label plus the trail you can forward.

| Verdict | Meaning |
| --- | --- |
| Verified | The claim lines up with the traced sources |
| Mixed | Partly true, contested, or incomplete |
| False | Conflicts with the evidence, or sits on a bad trail |

Confidence is a model score. The trail is the part that matters.

---

## The site

### Home — `/`

Night-city landing page with the scanner in the hero.

| Piece | Details |
| --- | --- |
| Header | How it works, Caught in the web, The creed, Open scanner |
| Hero | “Your spidey-sense for what's true.” Claim box, **Thwip! Run the check**, **Full trust report** |
| Caught in the web | Recent checks with verdict + % confidence |
| How it works | The three steps above |
| The creed | “With great facts come great responsibility.” Free first check, no signup wall |
| Footer | Independent verification · friendly neighborhood fact-checker · © 2026 |

Recent checks currently on the page:

- FALSE 94% — “Drinking 8 glasses of water a day is medically required”
- VERIFIED 98% — “The James Webb telescope captured a new nebula image”
- MIXED 61% — “City will ban all e-scooters by 2027”
- FALSE 89% — “New app updates secretly record your calls”
- VERIFIED 97% — “Central bank holds rates steady this quarter”

### Report — `/analysis`

Dashboard for one claim, not a blog post.

| Block | Details |
| --- | --- |
| Summary | Model confidence, sources for / against, trail label (sample: FALSE TRAIL) |
| Evidence web | Source credibility, primary evidence, cross-verification, chain integrity, recency & context, language signals |
| Trust over spread | Whether the rumor is outrunning the evidence |
| Source trail | Each source marked **supports**, **neutral**, or **contradicts** |

Sample trail on the live report: national statistics bureau (supports), wire service (supports), university lab (neutral), anonymous repost chain (contradicts).

The report page is shipped as a designed sample until the live AI backend is connected. Use it to see the full verdict UI. Do not treat those sample numbers as a live check of a new paste.

---

## Stack

React · Vite · React Router · Tailwind-style UI · Netlify

```bash
npm install
npm run dev
