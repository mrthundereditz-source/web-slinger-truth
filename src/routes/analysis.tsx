import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText, Globe, GraduationCap, Zap, Newspaper, Share2, ShieldCheck } from "lucide-react";
import { useMemo } from "react";

type Search = { claim: string };

export const Route = createFileRoute("/analysis")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    claim: typeof search["claim"] === "string" ? search["claim"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Trust Report — WEB OF TRUST" },
      {
        name: "description",
        content:
          "The full WEB OF TRUST trust report: overall trust score, evidence web, source trail, and confidence graph for the claim you scanned.",
      },
      { property: "og:title", content: "Trust Report — WEB OF TRUST" },
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
    return {
      label: "VERIFIED TRUE",
      tone: "text-web-cyan",
      glow: "shadow-[0_0_30px_color-mix(in_oklab,var(--web-cyan)_25%,transparent)]",
      chipBorder: "border-web-cyan/50 bg-web-cyan/10 text-web-cyan",
      dot: "bg-web-cyan",
    };
  if (score >= 45)
    return {
      label: "MIXED SIGNALS",
      tone: "text-web-gold",
      glow: "shadow-[0_0_30px_color-mix(in_oklab,var(--web-gold)_25%,transparent)]",
      chipBorder: "border-web-gold/50 bg-web-gold/10 text-web-gold",
      dot: "bg-web-gold",
    };
  return {
    label: "FALSE TRAIL",
    tone: "text-web-red-bright",
    glow: "shadow-[0_0_30px_color-mix(in_oklab,var(--web-red)_30%,transparent)]",
    chipBorder: "border-web-red/50 bg-web-red/10 text-web-red-bright",
    dot: "bg-web-red-bright",
  };
}

type Factor = { name: string; score: number; note: string };
type SourceRow = { name: string; type: string; reliability: number; stance: "supports" | "contradicts" | "neutral" };

function buildAnalysis(claim: string) {
  const seed = hashString(claim || "web of trust");
  const rand = (() => {
    let s = seed || 1;
    return () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
  })();

  const score = 30 + Math.round(rand() * 68);
  const confidence = 70 + Math.round(rand() * 28);
  const momentum = Math.round((rand() * 24 - 6) * 10) / 10;

  const factors: Factor[] = [
    { name: "Source credibility", score: 25 + Math.round(rand() * 75), note: "Weighted track record of every traced source." },
    { name: "Primary evidence", score: 20 + Math.round(rand() * 80), note: "Direct documents, datasets, and first-hand records." },
    { name: "Cross-verification", score: 30 + Math.round(rand() * 70), note: "Independent outlets reporting the same facts." },
    { name: "Chain integrity", score: 15 + Math.round(rand() * 85), note: "How cleanly the claim traces back without repost decay." },
    { name: "Recency & context", score: 35 + Math.round(rand() * 65), note: "Whether the claim still holds in current context." },
    { name: "Language signals", score: 40 + Math.round(rand() * 60), note: "Sensationalism, hedging, and emotional-load markers." },
  ];

  const timeline = Array.from({ length: 14 }, (_, i) => {
    const base = score + Math.sin(i * 0.9 + (seed % 7)) * 16;
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

  return { score, confidence, momentum, factors, timeline, sources };
}

const SOURCE_ICONS = [FileText, Newspaper, GraduationCap, Share2, Globe, Zap, ShieldCheck] as const;

/* ---------------- shared chrome ---------------- */

function Panel({
  children,
  className = "",
  hairline = "via-web-red-bright",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  hairline?: string;
  delay?: number;
}) {
  return (
    <div
      className={`animate-rise-in relative overflow-hidden rounded-2xl border border-border/80 bg-card/50 backdrop-blur-xl ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${hairline} to-transparent opacity-60`} aria-hidden="true" />
      {children}
    </div>
  );
}

/* ---------------- charts ---------------- */

function TrustGauge({ score }: { score: number }) {
  const R = 84;
  const CIRC = Math.PI * R;
  const filled = (score / 100) * CIRC;
  return (
    <div className="relative mx-auto w-56">
      <svg viewBox="0 0 200 112" className="w-full drop-shadow-[0_0_18px_color-mix(in_oklab,var(--web-red)_35%,transparent)]">
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
        <path d="M 16 104 A 84 84 0 0 1 184 104" fill="none" stroke="var(--muted)" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M 16 104 A 84 84 0 0 1 184 104"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRC}`}
          className="animate-gauge-sweep"
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--web-red-bright)" />
            <stop offset="55%" stopColor="var(--web-gold)" />
            <stop offset="100%" stopColor="var(--web-cyan)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="font-display text-6xl leading-none tracking-tight text-foreground">{score}</span>
        <span className="mt-1 font-mono2 text-[10px] font-bold uppercase tracking-[0.25em] text-web-cyan">Score impact</span>
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
  const ring = (f: number) => factors.map((_, i) => point(i, R * f).join(",")).join(" ");
  const valuePoly = factors.map((f, i) => point(i, (R * f.score) / 100).join(",")).join(" ");

  return (
    <svg viewBox="0 0 260 240" className="mx-auto w-full max-w-xs drop-shadow-[0_0_16px_color-mix(in_oklab,var(--web-cyan)_20%,transparent)]">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(f)} fill="none" stroke="var(--border)" strokeWidth="1" />
      ))}
      {factors.map((_, i) => {
        const [x, y] = point(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth="0.5" />;
      })}
      <polygon
        points={valuePoly}
        fill="color-mix(in oklab, var(--web-cyan) 12%, transparent)"
        stroke="var(--web-cyan)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {factors.map((f, i) => {
        const [x, y] = point(i, (R * f.score) / 100);
        return <circle key={i} cx={x} cy={y} r="2.5" fill="var(--web-red-bright)" />;
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
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full drop-shadow-[0_0_15px_color-mix(in_oklab,var(--web-red)_25%,transparent)]"
      preserveAspectRatio="none"
      style={{ height: 180 }}
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--web-red-bright)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--web-red-bright)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((g) => (
        <line key={g} x1={pad} x2={w - pad} y1={ys(g)} y2={ys(g)} stroke="var(--border)" strokeDasharray="10 10" />
      ))}
      <path d={area} fill="url(#areaGrad)" />
      <path d={path} fill="none" stroke="var(--web-red-bright)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {timeline.map((v, i) => (
        <circle key={i} cx={xs(i)} cy={ys(v)} r="3.5" fill="var(--night-1)" stroke="var(--web-red-bright)" strokeWidth="2" />
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
      {/* halftone + city glow backdrop */}
      <div className="halftone pointer-events-none fixed inset-0 opacity-[0.05]" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(70%_50%_at_80%_-10%,var(--night-3),transparent_60%),radial-gradient(50%_40%_at_0%_100%,color-mix(in_oklab,var(--web-red)_22%,transparent),transparent_60%)]"
        aria-hidden="true"
      />

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
            className="rounded-lg border border-border px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-all hover:border-web-red-bright hover:text-foreground hover:shadow-[0_0_16px_color-mix(in_oklab,var(--web-red)_30%,transparent)]"
          >
            New scan
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-6 px-5 py-10">
        {/* claim header panel */}
        <Panel className="p-8" delay={0}>
          <div className="pointer-events-none absolute -mr-32 -mt-32 right-0 top-0 size-64 rounded-full bg-web-red/10 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -mb-32 -ml-32 bottom-0 left-0 size-64 rounded-full bg-web-cyan/10 blur-[100px]" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="size-2 rotate-45 bg-web-cyan" aria-hidden="true" />
                <span className="font-mono2 text-xs font-bold uppercase tracking-[0.3em] text-web-cyan">
                  Synthetic intelligence analysis
                </span>
              </div>
              <h1 className="max-w-3xl text-balance font-body text-3xl font-bold italic leading-tight tracking-tight text-foreground md:text-4xl">
                {claim ? `“${claim}”` : "Sample claim report"}
              </h1>
              <p className="font-mono2 text-xs text-muted-foreground">
                {analysis.confidence}% model confidence · {supports} sources for · {contradicts} against
              </p>
            </div>
            <div className="shrink-0 -skew-x-6">
              <div
                className={`inline-flex items-center gap-4 rounded-xl border px-8 py-4 ${verdict.chipBorder} ${verdict.glow}`}
              >
                <div className={`size-3 animate-pulse rounded-full ${verdict.dot}`} aria-hidden="true" />
                <span className="skew-x-6 font-display text-3xl tracking-widest">{verdict.label}</span>
              </div>
            </div>
          </div>
        </Panel>

        {/* gauge + radar + signals */}
        <section className="grid gap-6 md:grid-cols-3">
          <Panel className="flex flex-col items-center justify-center p-8 text-center" hairline="via-web-red-bright" delay={80}>
            <h2 className="mb-8 font-mono2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Trust confidence</h2>
            <TrustGauge score={analysis.score} />
            <p className="mt-8 text-sm font-light leading-relaxed text-muted-foreground">
              Weighed across {analysis.factors.length} signals and {analysis.sources.length} traced sources.
            </p>
          </Panel>

          <Panel className="flex flex-col items-center justify-center p-8" hairline="via-web-cyan" delay={160}>
            <h2 className="mb-6 font-mono2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Evidence web</h2>
            <RadarWeb factors={analysis.factors} />
          </Panel>

          <Panel className="p-8" hairline="via-web-red-bright" delay={240}>
            <h2 className="mb-5 font-mono2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Signal vectors</h2>
            <div className="space-y-4">
              {analysis.factors.map((f, i) => (
                <div key={f.name} className="space-y-1.5">
                  <div className="flex justify-between font-mono2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">{f.name}</span>
                    <span className="text-foreground">{f.score}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className={`h-full rounded-full ${i % 2 === 0 ? "bg-web-cyan shadow-[0_0_8px_color-mix(in_oklab,var(--web-cyan)_60%,transparent)]" : "bg-web-red-bright shadow-[0_0_8px_color-mix(in_oklab,var(--web-red-bright)_60%,transparent)]"}`}
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        {/* velocity chart */}
        <Panel className="p-8" hairline="via-web-cyan" delay={320}>
          <div className="pointer-events-none absolute right-0 top-0 size-32 -translate-y-10 translate-x-10 opacity-20" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="fill-web-cyan">
              <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
            </svg>
          </div>
          <div className="mb-8 flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="font-mono2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Trust over spread</h2>
              <p className="text-sm font-light text-muted-foreground">Veracity momentum tracked across social graph clusters</p>
            </div>
            <div className="-skew-x-6 border-r-2 border-web-cyan bg-web-cyan/5 px-4 py-2 text-right">
              <span className="font-display text-3xl tracking-wider text-web-cyan">
                {analysis.momentum >= 0 ? "+" : ""}
                {analysis.momentum}%
              </span>
              <span className="block font-mono2 text-[9px] font-bold uppercase tracking-tighter text-muted-foreground">
                Spread acceleration
              </span>
            </div>
          </div>
          <ConfidenceGraph timeline={analysis.timeline} />
        </Panel>

        {/* source trail cards */}
        <section className="animate-rise-in [animation-delay:400ms]">
          <div className="mb-5 flex items-center gap-4">
            <h2 className="font-mono2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Source trail</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-web-red/60 to-transparent" aria-hidden="true" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {analysis.sources.map((s, i) => {
              const Icon = SOURCE_ICONS[i % SOURCE_ICONS.length];
              return (
                <div
                  key={s.name}
                  className="group relative rounded-xl border border-border/80 bg-card/50 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-web-red-bright/50 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--web-red)_15%,transparent)]"
                >
                  <div className="absolute right-0 top-0 p-2 opacity-30" aria-hidden="true">
                    <div className="size-4 border-r border-t border-web-cyan" />
                  </div>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="grid size-10 place-items-center rounded-lg border border-border bg-night-1/80 text-web-cyan">
                      <Icon className="size-5" />
                    </div>
                    <span
                      className={`rounded px-2 py-1 font-mono2 text-[9px] font-bold uppercase tracking-tighter ${
                        s.stance === "supports"
                          ? "border border-web-cyan/20 bg-web-cyan/10 text-web-cyan"
                          : s.stance === "contradicts"
                            ? "border border-web-red/20 bg-web-red/10 text-web-red-bright"
                            : "border border-web-gold/20 bg-web-gold/10 text-web-gold"
                      }`}
                    >
                      {s.stance}
                    </span>
                  </div>
                  <h3 className="mb-1 font-bold tracking-tight text-foreground">{s.name}</h3>
                  <p className="mb-4 text-xs font-light text-muted-foreground">{s.type}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
                      <div
                        className={`h-full rounded-full ${s.reliability >= 60 ? "bg-web-cyan" : "bg-web-red-bright"}`}
                        style={{ width: `${s.reliability}%` }}
                      />
                    </div>
                    <span className="font-mono2 text-[10px] text-muted-foreground">{s.reliability}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <p className="pt-2 text-center font-mono2 text-[11px] text-muted-foreground">
          Demo analysis · connect WEB OF TRUST's AI backend for live verdicts
        </p>
      </main>
    </div>
  );
}
