WEB OF TRUST

Your spidey-sense for what's true.

WEB OF TRUST is an AI fact-checker with a spider-sense theme. You paste a claim. The app splits it into checkable pieces, traces those pieces toward sources, and returns a verdict before the rumor moves on.

Live website: https://weboftrust.netlify.app/

















Product



AI fact-checker





Tagline



Your spidey-sense for what's true





Live model label



sense-v3





Public URL



https://weboftrust.netlify.app/





Report URL



https://weboftrust.netlify.app/analysis





Year



2026

This README explains the website itself: what it is, every page and section, how a check works, what each verdict and score means, how to use it, and what is demo versus live.



What this website is

WEB OF TRUST is a single-purpose web app:





A landing page where anyone can paste a claim.



A scanner that runs a fast check.



A full trust report that shows score, evidence web, source trail, and confidence.

The tone is comic-book on purpose. The product is serious: stop a rumor before it spreads. The site describes itself as an independent verification tool and a friendly neighborhood fact-checker.

It is not the old MyWOT browser-reputation extension. It is not a decentralized identity “web of trust” protocol. It is a fact-checking front end.

Meta description used on the live site:



Paste any claim. WEB OF TRUST's AI traces every thread of evidence across verified sources and returns a verdict before the rumor spreads. With great facts come great responsibility.



Who it is for





People who saw a headline, screenshot, or viral post and want a first pass before sharing it



Readers who want a verdict they can forward, not another long essay



Anyone who does not want to create an account just to check one claim

The first check is framed as free: no account, no signup wall, no fine print.



Live pages

The site is a single-page app with two main views.







URL



What you see





https://weboftrust.netlify.app/



Home: hero, scanner, recent checks, how it works, creed, footer





https://weboftrust.netlify.app/analysis



Full trust report: score, evidence web, source trail, confidence graph

On the homepage, these jumps exist in the top nav:







Nav label



Jumps to



Purpose





How it works



#how



Three-step explainer





Caught in the web



#caught



Recent public checks





The creed



#creed



Responsibility / free-check promise





Open scanner



#scanner



Claim input box



Homepage, section by section

1. Header

Left: red W mark plus the split wordmark WEB OF / TRUST.

Center: How it works · Caught in the web · The creed.

Right: Open scanner.

The header stays on the night-city background so the brand is visible before you scroll.

2. Hero

Badge: SPIDER-SENSE · FOR FACTS

Headline:



YOUR SPIDEY-SENSE FOR WHAT'S TRUE.

Supporting copy:



The city runs on rumors. WEB OF TRUST reads any claim, traces every thread of evidence across verified sources, and slings back a verdict — before the story swings past you.

Visual language: midnight city, moon, spiderweb in the corner, a small red spider. The look tells you this is a “friendly neighborhood” checker, not a government portal.

3. Fact scanner

This is the product.

Status line: FACT SCANNER · LIVE
Model line: model · sense-v3

You type or paste a claim into the field. Placeholder example:



Paste a claim — e.g. “This viral video shows a real event...”

Two actions:







Button



What it is for





Thwip! Run the check



Fast verdict on the homepage flow





Full trust report



Opens the analysis dashboard at /analysis

Fine print under the buttons:



No account needed · verdict in seconds

What you can paste:





a headline



a quote



a social post



any short claim you want tested

The scanner is designed to split a messy sentence into individual assertions so one vague number cannot hide inside a longer claim.

4. Caught in the web — recent checks

A public strip of example / recent scans. Each card has:





a verdict label



a confidence percentage



the claim text

Currently shown on the live site:







Verdict



Confidence



Claim





FALSE



94%



“Drinking 8 glasses of water a day is medically required”





VERIFIED



98%



“The James Webb telescope captured a new nebula image”





MIXED



61%



“City will ban all e-scooters by 2027”





FALSE



89%



“New app updates secretly record your calls”





VERIFIED



97%



“Central bank holds rates steady this quarter”

This section exists so a new visitor can see what an answer looks like before they paste their own claim.

5. How it works — “Three moves. One swing.”







Step



Name



What happens





01



Snag the claim



You paste a headline, quote, or post. The app splits it into checkable assertions.





02



Trace every thread



Each fact is traced to a primary source, archive, or dataset. Dead links and repost chains are flagged.





03



Sling the verdict



You get one score — Verified, Mixed, or False — plus a citation trail you can forward.

That is the whole product loop. Input → trace → verdict.

6. The creed

Headline:



WITH GREAT FACTS COME GREAT RESPONSIBILITY.

Promise:



Free to check your first claim. No account, no signup wall, no fine print.

Button: Start a free check (returns you to the scanner).

This section is the site’s ethics line. Fast checks are useless if people treat them as final truth. The creed is there to keep the tone responsible.

7. Footer





Wordmark again



Independent verification · friendly neighborhood fact-checker



© 2026 WEB OF TRUST



Full trust report (/analysis)

The report is the deep view. Title in the browser: Trust Report — WEB OF TRUST.

It is built as a dashboard, not a blog post. Current live page is labeled:



Demo analysis · connect WEB OF TRUST's AI backend for live verdicts

So the layout is real. The numbers you see there today are a sample claim report until a live backend is wired in. That is part of the product state and should stay honest in this README.

Report header





Brand lockup



New scan — go back and check another claim



Eyebrow: Synthetic intelligence analysis



Title: Sample claim report

Top summary

The sample report currently shows:





83% model confidence



2 sources for



1 source against



Overall trail label: FALSE TRAIL



Trust confidence: 36

Copy on the score:



Score impact. Weighed across 6 signals and 4 traced sources.

Read that as: the headline verdict is not a single coin flip. Several signals are combined.

Evidence web — signal vectors

The report breaks trust into six vectors:







Signal



Sample value



What it is asking





Source credibility



48%



Are the publishers / datasets themselves trustworthy?





Primary evidence



63%



Does a primary source exist, or only commentary?





Cross-verification



38%



Do independent sources agree?





Chain integrity



48%



Is this a clean trail or a repost chain?





Recency & context



86%



Is the evidence current, or an old fact in a new costume?





Language signals



75%



Does the wording look like hype, hedging, or straight reporting?

A high recency score with a low cross-verification score is a warning: the claim may be fresh and still poorly confirmed.

Trust over spread

The report also tracks veracity momentum across social-graph style clusters.

Sample value:





Spread acceleration: -5.9%

This is the “does the rumor outrun the evidence?” layer. A claim can spread fast and still be false. The report tries to show that gap instead of only showing a yes/no stamp.

Source trail

Each traced source has:





stance: supports / neutral / contradicts



name



type



a weight / score

Sample trail on the live report:







Stance



Source



Type



Score





supports



National statistics bureau



Primary dataset



96%





supports



Wire service report



News agency



91%





neutral



University research lab



Academic



88%





contradicts



Anonymous repost chain



Social media



14%

That last row is the point of the product. A viral repost can look loud and still sit at the bottom of the trail.

Example analysis lines used in the product

The app copy includes both failure and success patterns:





Failure pattern: Two load-bearing facts trace back to a single anonymous repost. The core number is inflated by roughly 40%.



Success pattern: Claim matches the primary source and two independent wire reports. Thread is intact end to end.

Those sentences are what a “citation trail you can forward” is supposed to sound like.



Verdict system

Every public check uses one of three labels plus a confidence percentage.







Verdict



Meaning on this site





VERIFIED



The claim lines up with the traced sources. The thread is intact.





MIXED



Some parts hold, some do not, or the evidence is incomplete / contested.





FALSE



The claim conflicts with the available evidence, or rests on a bad trail.

The report page can also show a stronger summary stamp such as FALSE TRAIL when the path to the claim is the problem, not only the wording.

Confidence is a model score. It is not a court finding and not a guarantee.



How to use the website





Open https://weboftrust.netlify.app/.



Click Open scanner or scroll to the input.



Paste one claim. Keep it specific. “This video is real and was filmed yesterday in X” is better than “the news is fake.”



Click Thwip! Run the check for the fast pass.



Click Full trust report when you want the score breakdown and source trail.



Read the trail before you share the verdict. If the only high-energy source is an anonymous repost, treat the claim as unproven even if it is popular.

Good inputs:





a single factual sentence



a quoted statistic



a headline that asserts something happened

Weak inputs:





pure opinion (“this policy is bad”)



a whole article pasted at once



a claim with no public world to check against



Brand and interface

The site is designed as a night city with a spider-sense overlay.







Element



Role





Night skyline + moon



Setting. Rumors move after dark.





Web graphic + red spider



Brand mark. “Something is buzzing in the web.”





Red / cyan / gold accents



Action (check), live status, highlight





Anton



Display type for headlines





Space Grotesk



Body / UI





JetBrains Mono



Status, model name, technical labels

Voice: short, punchy, comic-book verbs (snag, trace, sling, thwip) with a responsibility line so it does not become a joke app.



What is live vs demo

Be precise about the current deploy.

Already on the public site:





branded landing page



scanner UI



recent-check examples



how-it-works and creed



full report layout at /analysis

Still called out on the report page:



Demo analysis · connect WEB OF TRUST's AI backend for live verdicts

That means the analysis dashboard is designed and shipped. Live model calls need the backend connected. Do not describe the sample report numbers as a real check of a user-submitted claim until that backend is on.



Technical snapshot of the current deploy

Observed from the live Netlify site:







Piece



What is running





Hosting



Netlify (weboftrust.netlify.app)





App type



React single-page app





Bundler



Vite / Rolldown (hashed /assets/* files)





Routing



React Router (/ and /analysis)





Fonts



Anton, Space Grotesk, JetBrains Mono





Styling



Utility CSS (Tailwind-style classes)





Model label in UI



sense-v3

Standard local commands if you have the source repo:

npm install
npm run dev
npm run build

Netlify production settings for this kind of app:







Setting



Value





Build command



npm run build





Publish directory



dist





Node



22

SPA fallback (so /analysis does not 404 on refresh):

/*    /index.html   200



Limits and responsible use

WEB OF TRUST is an assistive checker.

It can be wrong on:





breaking news with no primary source yet



satire that is written like news



old true facts reused as if they are new



claims that only exist inside a closed chat or a private video

It should not be used as:





a legal determination



a substitute for reading the cited source



a reason to harass someone

The creed is the rule of the site: with great facts come great responsibility. Share the trail, not only the stamp.



Sitemap of meaning

WEB OF TRUST
├── Home /
│   ├── Header (brand, section jumps, Open scanner)
│   ├── Hero (promise)
│   ├── Scanner #scanner (paste claim, fast check, full report)
│   ├── Caught in the web #caught (recent verdicts)
│   ├── How it works #how (snag → trace → sling)
│   ├── The creed #creed (responsibility + free first check)
│   └── Footer (independent verification)
└── Trust report /analysis
    ├── New scan
    ├── Overall verdict + model confidence
    ├── Evidence web (6 signal vectors)
    ├── Trust over spread
    └── Source trail (supports / neutral / contradicts)



Links





Home: https://weboftrust.netlify.app/



Scanner: https://weboftrust.netlify.app/#scanner



How it works: https://weboftrust.netlify.app/#how



Recent checks: https://weboftrust.netlify.app/#caught



The creed: https://weboftrust.netlify.app/#creed



Trust report: https://weboftrust.netlify.app/analysis
