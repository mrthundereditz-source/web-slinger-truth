import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

type Search = { claim: string };

export const Route = createFileRoute("/analysis")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    claim: typeof search["claim"] === "string" ? search["claim"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Trust Report — Webtruth" },
      {
        name: "description",
        content:
          "The full Webtruth trust report: overall trust score, evidence web, source trail, and confidence graph for the claim you scanned.",
      },
      { property: "og:title", content: "Trust Report — Webtruth" },
      {
        property: "og:description",
        content: "Trust score, evidence web, and source trail for your scanned claim.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalysisPage,
});

/* ---------------- deterministic demo analysis ---------------- */

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function verdictFor(score: number) {
  if (score >= 75)
    return { label: "VERIFIED", tone: "text-web-cyan", chip: "text-web-cyan bg-web-cyan/15 border-web-cyan/40", bar: "from-web-cyan to-web-cyan" };
  if (score >= 45)
    return { label: "MIXED", tone: "text-web-gold", chip: "text-web-gold bg-web-gold/15 border-web-gold/40", bar: "from-web-gold to-web-red" };
  return { label: "FALSE", tone: "text-web-red-bright", chip: "text-web-red-bright bg-web-red/15 border-web-red/40", bar: "from-web-red to-web-red-bright" };
}

type Factor = { name: string; score: number; note: string };
type SourceRow = { name: string; type: string; reliability: number; stance: "supports" | "contradicts" | "neutral" };

function buildAnalysis(claim: string) {
  const seed = hashString(claim || "webtruth");
  const rand = (() => {
    let s = seed || 1;
    return () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
  })();

  const score = 30 + Math.round(rand() * 68);
  const confidence = 70 + Math.round(rand() * 28);

  const factors: Factor[] = [
    { name: "Source credibility", score: 25 + Math.round(rand() * 75), note: "Weighted track record of every traced source." },
    { name: "Primary evidence", score: 20 + Math.round(rand() * 80), note: "Direct documents, datasets, and first-hand records." },
    { name: "Cross-verification", score: 30 + Math.round(rand() * 70), note: "Independent outlets reporting the same facts." },
    { name: "Chain integrity", score: 15 + Math.round(rand() * 85), note: "How cleanly the claim traces back without repost decay." },
    { name: "Recency & context", score: 35 + Math.round(rand() * 65), note: "Whether the claim still holds in current context." },
    { name: "Language signals", score: 40 + Math.round(rand() * 60), note: "Sensationalism, hedging, and emotional-load markers." },
  ];

  const timeline = Array.from({ length: 14 }, (_, i) => {
    const base = score + Math.sin(i * 0.9 + seed % 7) * 16;
    return Math.max(5, Math.min(99, Math.round(base + (rand() - 0.5) * 14)));
  });

  const sourcePool: SourceRow[] = [
    { name: "National statistics bureau", type: "Primary dataset", reliability: 96, stance: "supports" },
    { name: "Wire service report", type: "News agency", reliability: 91, stance: "supports" },
    { name: "University research lab", type: "Academic", reliability: 88, stance: "neutral" },
    { name: "Anonymous repost chain", type: "Social media", reliability: 14, stance: "contradicts" },
    { name: "Archived press release", type: "Official record", reliability: 93, stance: "supports" },
    { name: "Viral video account", type: "User content", reliability: 22, stance: "contradicts" },
    { name: "Independent fact-check desk", type: "Verification org", reliability: 90, stance: "supports" },
  ];
  const sources = sourcePool.slice(0, 4 + (seed % 3));

  return { score, confidence, factors, timeline, sources };
}

/* ---------------- charts ---------------- */

function TrustGauge({ score }: { score: number }) {
  const R = 84;
  const CIRC = Math.PI * R; // half circle
  const filled = (score / 100) * CIRC;
  return (
    <div className="relative mx-auto w-56">
      <svg viewBox="0 0 200 112" className="w-full">
        {/* web spokes on the dial */}
        {[0, 30, 60, 90, 120, 150, 180].map((a) => {
          const rad = (Math.PI * a) / 180;
          return (
            <line
              key={a}
              x1={100 - 100 * Math.cos(rad)}
              y1={104 - 100 * Math.sin(rad)}
              x2={100 - 92 * Math.cos(rad)}
              y2={104 - 92 * Math.sin(rad)}
              stroke="var(--border)"
              strokeWidth="2"
            />
          );
        })}
        <path d="M 16 104 A 84 84 0 0 1 184 104" fill="none" stroke="var(--muted)" strokeWidth="12" strokeLinecap="round" />
        <path
          d="M 16 104 A 84 84 0 0 1 184 104"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRC}`}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--web-red-bright)" />
            <stop offset="55%" stopColor="var(--web-gold)" />
            <stop offset="100%" stopColor="var(--web-cyan)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <span className="font-display text-5xl text-foreground">{score}</span>
        <span className="font-mono2 text-sm text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

function RadarWeb({ factors }: { factors: Factor[] }) {
  const cx = 130;
  const cy = 120;
  const R = 92;
  const n = factors.length;
  const point = (i: number, r: number) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const ring = (f: number) =>
    factors
      .map((_, i) => point(i, R * f).join(","))
      .join(" ");
  const valuePoly = factors
    .map((f, i) => point(i, (R * f.score) / 100).join(","))
    .join(" ");

  return (
    <svg viewBox="0 0 260 240" className="mx-auto w-full max-w-sm">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(f)} fill="none" stroke="var(--border)" strokeWidth="1" />
      ))}
      {factors.map((_, i) => {
        const [x, y] = point(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />;
      })}
      <polygon
        points={valuePoly}
        fill="color-mix(in oklab, var(--web-red) 30%, transparent)"
        stroke="var(--web-red-bright)"
        strokeWidth="2"
      />
      {factors.map((f, i) => {
        const [x, y] = point(i, (R * f.score) / 100);
        return <circle key={i} cx={x} cy={y} r="3" fill="var(--web-cyan)" />;
      })}
      {factors.map((f, i) => {
        const [x, y] = point(i, R + 18);
        return (
          <text
            key={f.name}
            x={x}
            y={y}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="8.5"
            fontFamily="JetBrains Mono, monospace"
          >
            {f.name.split(" ")[0]}
          </text>
        );
      })}
    </svg>
  );
}

function ConfidenceGraph({ timeline }: { timeline: number[] }) {
  const w = 560;
  const h = 160;
  const pad = 12;
  const xs = (i: number) => pad + (i / (timeline.length - 1)) * (w - pad * 2);
  const ys = (v: number) => h - pad - (v / 100) * (h - pad * 2);
  const path = timeline.map((v, i) => `${i === 0 ? "M" : "L"} ${xs(i).toFixed(1)} ${ys(v).toFixed(1)}`).join(" ");
  const area = `${path} L ${xs(timeline.length - 1)} ${h - pad} L ${xs(0)} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 180 }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--web-cyan)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--web-cyan)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((g) => (
        <line key={g} x1={pad} x2={w - pad} y1={ys(g)} y2={ys(g)} stroke="var(--border)" strokeDasharray="4 6" />
      ))}
      <path d={area} fill="url(#areaGrad)" />
      <path d={path} fill="none" stroke="var(--web-cyan)" strokeWidth="2.5" strokeLinejoin="round" />
      {timeline.map((v, i) => (
        <circle key={i} cx={xs(i)} cy={ys(v)} r="3.5" fill="var(--night-1)" stroke="var(--web-cyan)" strokeWidth="2" />
      ))}
    </svg>
  );
}

/* ---------------- page ---------------- */

function AnalysisPage() {
  const { claim } = Route.useSearch();
  const analysis = useMemo(() => buildAnalysis(claim ?? ""), [claim]);
  const verdict = verdictFor(analysis.score);
  const supports = analysis.sources.filter((s) => s.stance === "supports").length;
  const contradicts = analysis.sources.filter((s) => s.stance === "contradicts").length;

  return (
    <div className="relative min-h-screen font-body">
      {/* backdrop glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(70%_50%_at_80%_-10%,var(--night-3),transparent_60%),radial-gradient(50%_40%_at_0%_100%,color-mix(in_oklab,var(--web-red)_22%,transparent),transparent_60%)]" aria-hidden="true" />

      <header className="relative z-10 border-b border-border/60 bg-night-1/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-web-red font-display text-lg text-primary-foreground">W</div>
            <span className="font-display text-xl tracking-wide text-foreground">
              WEB<span className="text-web-red-bright">TRUTH</span>
            </span>
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-border px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-web-red-bright hover:text-foreground"
          >
            New scan
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-12">
        {/* claim header */}
        <div className="animate-rise-in">
          <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">Trust report · sense-v3</p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl leading-tight text-foreground md:text-4xl">
            {claim ? `\u201c${claim}\u201d` : "Sample claim report"}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={`rounded-md border px-3 py-1 font-mono2 text-xs font-semibold uppercase tracking-wider ${verdict.chip}`}>
              {verdict.label}
            </span>
            <span className="font-mono2 text-xs text-muted-foreground">{analysis.confidence}% model confidence</span>
            <span className="font-mono2 text-xs text-muted-foreground">
              {supports} sources for · {contradicts} against
            </span>
          </div>
        </div>

        {/* score + radar */}
        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="animate-rise-in halftone-red relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md [animation-delay:80ms]">
            <h2 className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">Overall trust score</h2>
            <div className="mt-6">
              <TrustGauge score={analysis.score} />
            </div>
            <p className={`mt-4 text-center font-display text-2xl tracking-wide ${verdict.tone}`}>{verdict.label}</p>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Weighed across {analysis.factors.length} signals and {analysis.sources.length} traced sources.
            </p>
          </div>

          <div className="animate-rise-in relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md [animation-delay:160ms]">
            <h2 className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">Evidence web</h2>
            <div className="mt-4">
              <RadarWeb factors={analysis.factors} />
            </div>
          </div>
        </section>

        {/* confidence graph */}
        <section className="animate-rise-in mt-5 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md [animation-delay:240ms]">
          <div className="flex items-center justify-between">
            <h2 className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">Trust over the claim's spread</h2>
            <span className="font-mono2 text-[11px] text-muted-foreground">last 14 checkpoints</span>
          </div>
          <div className="mt-4">
            <ConfidenceGraph timeline={analysis.timeline} />
          </div>
        </section>

        {/* factor bars + sources */}
        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="animate-rise-in rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md [animation-delay:320ms]">
            <h2 className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">Signal breakdown</h2>
            <div className="mt-5 space-y-4">
              {analysis.factors.map((f) => (
                <div key={f.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{f.name}</span>
                    <span className="font-mono2 text-xs text-muted-foreground">{f.score}/100</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${f.score >= 60 ? "from-web-cyan to-web-cyan" : f.score >= 40 ? "from-web-gold to-web-gold" : "from-web-red to-web-red-bright"}`}
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-rise-in rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md [animation-delay:400ms]">
            <h2 className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-web-cyan">Source trail</h2>
            <ul className="mt-5 space-y-3">
              {analysis.sources.map((s) => (
                <li key={s.name} className="rounded-xl border border-border bg-night-1/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.type}</p>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 font-mono2 text-[10px] font-semibold uppercase tracking-wider ${
                        s.stance === "supports"
                          ? "bg-web-cyan/15 text-web-cyan"
                          : s.stance === "contradicts"
                            ? "bg-web-red/15 text-web-red-bright"
                            : "bg-web-gold/15 text-web-gold"
                      }`}
                    >
                      {s.stance}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                      <div className="h-full rounded-full bg-web-blue" style={{ width: `${s.reliability}%` }} />
                    </div>
                    <span className="font-mono2 text-[11px] text-muted-foreground">{s.reliability}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className="mt-8 text-center font-mono2 text-[11px] text-muted-foreground">
          Demo analysis · connect Webtruth's AI backend for live verdicts
        </p>
      </main>
    </div>
  );
}
