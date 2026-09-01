import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webtruth — AI Fact-Checker with Spider-Sense" },
      {
        name: "description",
        content:
          "Paste any claim. Webtruth's AI traces every thread of evidence across verified sources and returns a verdict before the rumor spreads. With great facts come great responsibility.",
      },
      { property: "og:title", content: "Webtruth — AI Fact-Checker with Spider-Sense" },
      {
        property: "og:description",
        content:
          "Paste any claim. Webtruth's AI traces every thread of evidence and returns a verdict before the rumor spreads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------- Background art ---------------- */

function CitySkyline() {
  // Deterministic pseudo-random skyline with lit windows
  const buildings = useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const list: { x: number; w: number; h: number; windows: { wx: number; wy: number; flicker: boolean }[] }[] = [];
    let x = -20;
    while (x < 1480) {
      const w = 40 + rand() * 70;
      const h = 60 + rand() * 190;
      const windows: { wx: number; wy: number; flicker: boolean }[] = [];
      const cols = Math.floor(w / 16);
      const rows = Math.floor(h / 22);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (rand() > 0.62) {
            windows.push({ wx: x + 8 + c * 16, wy: 320 - h + 10 + r * 22, flicker: rand() > 0.9 });
          }
        }
      }
      list.push({ x, w, h, windows });
      x += w + 6 + rand() * 18;
    }
    return list;
  }, []);

  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-[42vh] min-h-64 w-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* back layer */}
      <g fill="var(--night-3)" opacity="0.55">
        <rect x="0" y="180" width="120" height="140" />
        <rect x="150" y="140" width="90" height="180" />
        <rect x="270" y="200" width="150" height="120" />
        <rect x="460" y="120" width="80" height="200" />
        <rect x="580" y="170" width="130" height="150" />
        <rect x="750" y="90" width="100" height="230" />
        <rect x="890" y="160" width="140" height="160" />
        <rect x="1070" y="130" width="90" height="190" />
        <rect x="1200" y="180" width="130" height="140" />
        <rect x="1360" y="110" width="90" height="210" />
      </g>
      {/* front layer with windows */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={320 - b.h} width={b.w} height={b.h} fill="var(--night-2)" />
          {b.windows.map((win, j) => (
            <rect
              key={j}
              x={win.wx}
              y={win.wy}
              width="6"
              height="8"
              rx="1"
              fill="var(--web-gold)"
              opacity="0.75"
              className={win.flicker ? "animate-window-flicker" : undefined}
              style={win.flicker ? { animationDelay: `${(j % 5) * 1.3}s` } : undefined}
            />
          ))}
        </g>
      ))}
      {/* ground shadow */}
      <rect x="0" y="318" width="1440" height="2" fill="var(--night-1)" />
    </svg>
  );
}

function CornerWeb({ className }: { className?: string }) {
  // Radial spider web anchored to the top-right corner
  const spokes = 9;
  const rings = [60, 120, 190, 270, 360, 460];
  const cx = 480;
  const cy = 0;
  const lines: string[] = [];
  for (let s = 0; s <= spokes; s++) {
    const angle = (Math.PI / 2) * (s / spokes) + Math.PI / 2; // fan into the page
    lines.push(`M ${cx} ${cy} L ${cx + 560 * Math.cos(angle)} ${cy + 560 * Math.sin(angle)}`);
  }
  for (const r of rings) {
    let d = "";
    for (let s = 0; s <= spokes; s++) {
      const angle = (Math.PI / 2) * (s / spokes) + Math.PI / 2;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      // sagging curve between spokes
      const mid = (Math.PI / 2) * ((s + 0.5) / spokes) + Math.PI / 2;
      const mx = cx + (r + 14) * Math.cos(mid);
      const my = cy + (r + 14) * Math.sin(mid);
      d += s === 0 ? `M ${px} ${py}` : ` Q ${mx} ${my} ${px} ${py}`;
    }
    lines.push(d);
  }
  return (
    <svg
      className={className}
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1"
    >
      {lines.map((d, i) => (
        <path key={i} d={d} strokeLinecap="round" />
      ))}
    </svg>
  );
}

function HangingSpider() {
  return (
    <div className="absolute right-[14%] top-0 hidden md:block" aria-hidden="true">
      <div className="animate-web-sway">
        <div className="animate-spider-drop flex flex-col items-center">
          {/* thread */}
          <div className="h-40 w-px bg-foreground/40" />
          {/* spider */}
          <svg width="46" height="46" viewBox="0 0 46 46" className="-mt-0.5">
            <g stroke="var(--web-red)" strokeWidth="1.6" fill="none" strokeLinecap="round">
              <path d="M18 20 L6 12 M18 24 L4 22 M18 28 L6 34 M20 31 L12 42" />
              <path d="M28 20 L40 12 M28 24 L42 22 M28 28 L40 34 M26 31 L34 42" />
            </g>
            <ellipse cx="23" cy="26" rx="6.5" ry="8" fill="var(--night-2)" stroke="var(--web-red)" strokeWidth="1.6" />
            <circle cx="23" cy="16" r="4.5" fill="var(--night-2)" stroke="var(--web-red)" strokeWidth="1.6" />
            <path d="M20 24 q3 4 6 0" stroke="var(--web-red)" strokeWidth="1.4" fill="none" />
            <circle cx="21" cy="15" r="0.9" fill="var(--web-cyan)" />
            <circle cx="25" cy="15" r="0.9" fill="var(--web-cyan)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function NightBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* sky gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_-10%,var(--night-3),transparent_60%),radial-gradient(70%_60%_at_10%_110%,color-mix(in_oklab,var(--web-red)_30%,transparent),transparent_55%),linear-gradient(to_bottom,var(--night-1),var(--night-2))]" />
      {/* stars */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,oklch(1_0_0/70%)_1px,transparent_1.4px)] [background-size:90px_90px]" />
      {/* moon */}
      <div className="absolute left-[12%] top-[10%] size-24 rounded-full bg-[radial-gradient(circle_at_35%_35%,oklch(0.95_0.02_90),oklch(0.75_0.05_90))] opacity-80 shadow-[0_0_80px_30px_color-mix(in_oklab,var(--web-gold)_25%,transparent)]" />
      {/* giant corner web */}
      <CornerWeb className="absolute -right-16 -top-16 h-[34rem] w-[34rem] text-foreground/15 animate-web-glow md:h-[42rem] md:w-[42rem]" />
      <CornerWeb className="absolute -bottom-24 -left-24 h-[26rem] w-[26rem] rotate-180 text-foreground/10" />
      {/* halftone wash */}
      <div className="absolute inset-0 halftone opacity-30" />
      <CitySkyline />
      {/* bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-1 to-transparent" />
    </div>
  );
}

/* ---------------- UI pieces ---------------- */

const VERDICTS = [
  { tag: "FALSE", tone: "text-web-red-bright bg-web-red/15", claim: "\u201cDrinking 8 glasses of water a day is medically required\u201d", conf: 94 },
  { tag: "VERIFIED", tone: "text-web-cyan bg-web-cyan/15", claim: "\u201cThe James Webb telescope captured a new nebula image\u201d", conf: 98 },
  { tag: "MIXED", tone: "text-web-gold bg-web-gold/15", claim: "\u201cCity will ban all e-scooters by 2027\u201d", conf: 61 },
  { tag: "FALSE", tone: "text-web-red-bright bg-web-red/15", claim: "\u201cNew app updates secretly record your calls\u201d", conf: 89 },
  { tag: "VERIFIED", tone: "text-web-cyan bg-web-cyan/15", claim: "\u201cCentral bank holds rates steady this quarter\u201d", conf: 97 },
];

function Scanner() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState<null | { verdict: string; note: string; conf: number }>(null);
  const navigate = useNavigate();

  const runCheck = () => {
    if (!claim.trim()) return;
    const pool = [
      { verdict: "DISPUTED", note: "Two load-bearing facts trace back to a single anonymous repost. The core number is inflated by roughly 40%.", conf: 82 },
      { verdict: "VERIFIED", note: "Claim matches the primary source and two independent wire reports. Thread is intact end to end.", conf: 96 },
      { verdict: "FALSE", note: "No primary record exists. The story originated in a repost chain and contradicts the official dataset.", conf: 91 },
    ];
    setResult(pool[claim.length % pool.length] ?? null);
  };

  const openFullReport = () => {
    if (!claim.trim()) return;
    navigate({ to: "/analysis", search: { claim } });
  };

  return (
    <div id="scanner" className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-md">
      {/* sweep light */}
      <div className="animate-scan-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-web-cyan/15 to-transparent" />
      <div className="halftone-red pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">
            <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-web-cyan align-middle" />
            Fact scanner · live
          </span>
          <span className="font-mono2 text-[11px] text-muted-foreground">model · sense-v3</span>
        </div>

        <label htmlFor="claim" className="sr-only">Claim to verify</label>
        <textarea
          id="claim"
          rows={2}
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder={"Paste a claim — e.g. \u201cThis viral video shows a real event\u2026\u201d"}
          className="w-full resize-none rounded-xl border border-input bg-night-1/60 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={runCheck}
            className="animate-thwip inline-flex items-center gap-2 rounded-xl bg-web-red px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-web-red-bright"
          >
            Thwip! Run the check
          </button>
          <button
            onClick={openFullReport}
            className="inline-flex items-center gap-2 rounded-xl border border-web-cyan/40 bg-web-cyan/10 px-5 py-3 font-semibold text-web-cyan transition-colors hover:bg-web-cyan/20"
          >
            Full trust report
          </button>
          <span className="text-xs text-muted-foreground">No account needed · verdict in seconds</span>
        </div>

        {result && (
          <div className="animate-rise-in mt-5 rounded-xl border border-border bg-night-1/70 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono2 text-[11px] uppercase tracking-wider text-muted-foreground">Verdict</span>
              <span className="font-mono2 text-[11px] font-semibold uppercase tracking-wider text-web-red-bright">
                <span className="mr-1.5 inline-block size-1.5 rounded-full bg-web-red-bright align-middle" />
                {result.verdict}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{result.note}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">confidence</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-foreground/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-web-cyan to-web-red-bright" style={{ width: `${result.conf}%` }} />
                </div>
                <span className="font-mono2 text-[11px] text-web-cyan">{result.conf}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MOVES = [
  {
    num: "01",
    title: "Snag the claim",
    body: "Paste a headline, quote, or post. Webtruth splits it into individual checkable assertions — no vague number hides in the web.",
  },
  {
    num: "02",
    title: "Trace every thread",
    body: "Each fact is traced to a primary source, archive, or dataset. Dead links and repost chains get flagged on the spot.",
  },
  {
    num: "03",
    title: "Sling the verdict",
    body: "One clear score — Verified, Mixed, or False — with a citation trail you can forward to anyone before the rumor swings on.",
  },
];

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip font-body">
      <NightBackdrop />
      <HangingSpider />

      {/* Nav */}
      <header className="relative z-10 border-b border-border/60 bg-night-1/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-web-red font-display text-lg text-primary-foreground shadow-[0_0_18px_color-mix(in_oklab,var(--web-red)_60%,transparent)]">
              W
            </div>
            <span className="font-display text-xl tracking-wide text-foreground">
              WEB<span className="text-web-red-bright">TRUTH</span>
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#caught" className="transition-colors hover:text-foreground">Caught in the web</a>
            <a href="#creed" className="transition-colors hover:text-foreground">The creed</a>
          </nav>
          <a
            href="#scanner"
            className="rounded-lg border border-border px-3.5 py-2 text-sm font-semibold transition-colors hover:border-web-red-bright hover:text-foreground"
          >
            Open scanner
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5">
        {/* Hero */}
        <section className="relative pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="animate-rise-in max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-web-cyan/30 bg-web-cyan/5 px-3 py-1">
              <span className="size-1.5 animate-pulse rounded-full bg-web-cyan" />
              <span className="font-mono2 text-[11px] uppercase tracking-[0.18em] text-web-cyan">
                Spider-sense · for facts
              </span>
            </div>
            <h1 className="font-display text-stroke-comic text-balance text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] text-foreground">
              YOUR SPIDEY-SENSE FOR <span className="text-web-red-bright">WHAT'S&nbsp;TRUE.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The city runs on rumors. Webtruth reads any claim, traces every thread of evidence across
              verified sources, and slings back a verdict — before the story swings past you.
            </p>
          </div>

          <div className="animate-rise-in mt-10 max-w-2xl [animation-delay:180ms]">
            <Scanner />
          </div>
        </section>

        {/* Verdict ticker */}
        <section id="caught" className="border-t border-border/60 py-14">
          <p className="mb-6 font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">
            Caught in the web — recent checks
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VERDICTS.map((v, i) => (
              <article
                key={i}
                className="rounded-xl border border-border bg-card/70 p-5 backdrop-blur-sm transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded px-2 py-0.5 font-mono2 text-[10px] font-semibold uppercase tracking-wider ${v.tone}`}>
                    {v.tag}
                  </span>
                  <span className="font-mono2 text-[11px] text-muted-foreground">{v.conf}% conf.</span>
                </div>
                <p className="mt-3 text-sm leading-snug text-foreground/85">{v.claim}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works — comic panels */}
        <section id="how" className="border-t border-border/60 py-16">
          <h2 className="font-display text-stroke-comic text-4xl text-foreground md:text-5xl">
            THREE MOVES. <span className="text-web-red-bright">ONE SWING.</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {MOVES.map((m, i) => (
              <div
                key={m.num}
                className={`halftone-red relative rounded-xl border-2 border-foreground/15 bg-card/80 p-6 ${
                  i === 1 ? "md:rotate-1" : i === 2 ? "md:-rotate-1" : ""
                }`}
              >
                <span className="font-display text-6xl text-web-red/25">{m.num}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Creed CTA */}
        <section id="creed" className="pb-20 pt-6">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-web-red via-web-red/80 to-web-blue p-10 text-center md:p-16">
            <div className="halftone pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative">
              <h2 className="font-display text-stroke-comic text-balance text-4xl leading-[0.95] text-primary-foreground md:text-6xl">
                WITH GREAT FACTS COME GREAT RESPONSIBILITY.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-primary-foreground/85">
                Free to check your first claim. No account, no signup wall, no fine print.
              </p>
              <a
                href="#scanner"
                className="animate-thwip mt-8 inline-flex items-center gap-2 rounded-xl bg-night-1 px-7 py-3.5 font-semibold text-foreground transition-colors hover:bg-night-2"
              >
                Start a free check
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/60 bg-night-1/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 md:flex-row">
          <span className="font-display tracking-wide text-foreground">
            WEB<span className="text-web-red-bright">TRUTH</span>
          </span>
          <p className="font-mono2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Independent verification · friendly neighborhood fact-checker
          </p>
          <p className="font-mono2 text-[11px] text-muted-foreground">© 2026 Webtruth Labs</p>
        </div>
      </footer>
    </div>
  );
}
