import type { ReactNode } from "react";

/**
 * Illustrative artwork for project cards. These are drawings, not screenshots,
 * so they never pretend to show a real interface. Real screenshots go in
 * `images` in data/projects.ts and replace these on project pages.
 */
export function ProjectArt({ slug }: { slug: string }) {
  switch (slug) {
    case "code-warriors":
      return <GridArt />;
    case "deal-or-no-deal":
      return <CasesArt />;
    case "javafx-collection":
      return <WindowsArt />;
    default:
      return <div className="h-full w-full grain" />;
  }
}

function GridArt() {
  const cols = 11;
  const rows = 7;
  const agents = [
    { x: 3, y: 2, c: "#f2a7c8" },
    { x: 7, y: 4, c: "#b7a6f7" },
    { x: 5, y: 5, c: "#f3f1ec" },
  ];
  const resources = [
    { x: 9, y: 1 },
    { x: 1, y: 5 },
    { x: 8, y: 6 },
  ];
  const hazards = [
    { x: 5, y: 2 },
    { x: 2, y: 3 },
  ];
  const s = 26;
  return (
    <svg viewBox={`0 0 ${cols * s} ${rows * s}`} className="h-full w-full" aria-hidden>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <circle key={i} cx={(i % cols) * s + s / 2} cy={Math.floor(i / cols) * s + s / 2} r={1} fill="rgba(255,255,255,0.14)" />
      ))}
      {hazards.map((h, i) => (
        <g key={`h${i}`} stroke="rgba(255,255,255,0.28)" strokeWidth={1.2}>
          <line x1={h.x * s + 8} y1={h.y * s + 8} x2={h.x * s + s - 8} y2={h.y * s + s - 8} />
          <line x1={h.x * s + s - 8} y1={h.y * s + 8} x2={h.x * s + 8} y2={h.y * s + s - 8} />
        </g>
      ))}
      {resources.map((r, i) => (
        <rect key={`r${i}`} x={r.x * s + 9} y={r.y * s + 9} width={8} height={8} fill="none" stroke="rgba(183,166,247,0.6)" />
      ))}
      <path d={`M ${3 * s + 13} ${2 * s + 13} h ${2 * s} v ${s}`} stroke="rgba(242,167,200,0.35)" strokeDasharray="2 4" fill="none" />
      <path d={`M ${7 * s + 13} ${4 * s + 13} h ${s} v ${2 * s}`} stroke="rgba(183,166,247,0.35)" strokeDasharray="2 4" fill="none" />
      {agents.map((a, i) => (
        <g key={`a${i}`}>
          <circle cx={a.x * s + 13} cy={a.y * s + 13} r={10} fill={a.c} opacity={0.12} />
          <circle cx={a.x * s + 13} cy={a.y * s + 13} r={4} fill={a.c} />
        </g>
      ))}
    </svg>
  );
}

function CasesArt() {
  const opened = new Set([2, 5, 9, 11]);
  return (
    <div className="grid h-full w-full grid-cols-6 content-center gap-2 p-6" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => {
        const n = i + 1;
        const picked = n === 7;
        return (
          <div
            key={n}
            className={`relative flex aspect-[4/3] items-center justify-center rounded-md border font-mono text-[11px] ${
              picked
                ? "border-pink/60 bg-pink/15 text-pink"
                : opened.has(n)
                  ? "border-white/5 text-white/15"
                  : "border-white/15 bg-white/[0.04] text-fg/70"
            }`}
          >
            <span className="absolute -top-[3px] left-1/2 h-[3px] w-3 -translate-x-1/2 rounded-t-sm border border-b-0 border-white/20" />
            {n}
          </div>
        );
      })}
    </div>
  );
}

function WindowsArt() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <Window className="left-[7%] top-[12%] w-[34%] rotate-[-3deg]" title="Tic-Tac-Toe">
        <div className="grid grid-cols-3 gap-1 p-2.5">
          {["X", "O", "", "", "X", "O", "", "", "X"].map((c, i) => (
            <div key={i} className={`flex aspect-square items-center justify-center rounded-sm bg-white/[0.04] font-mono text-[11px] ${c === "X" ? "text-pink" : "text-violet"}`}>
              {c}
            </div>
          ))}
        </div>
      </Window>
      <Window className="right-[7%] top-[10%] w-[38%] rotate-[2deg]" title="TaskBuddy">
        <div className="space-y-2 p-3">
          {[true, true, false, false].map((done, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`size-2.5 rounded-[3px] border ${done ? "border-violet bg-violet/60" : "border-white/25"}`} />
              <span className={`h-1.5 rounded-full ${done ? "w-12 bg-white/15" : "w-16 bg-white/30"}`} />
            </div>
          ))}
        </div>
      </Window>
      <Window className="bottom-[7%] left-[38%] w-[34%] rotate-[-1deg]" title="Card Game">
        <div className="flex justify-center gap-2 p-3">
          <div className="flex h-12 w-9 items-center justify-center rounded-md border border-white/20 bg-white/[0.06] font-mono text-[11px] text-pink">A</div>
          <div className="flex h-12 w-9 items-center justify-center rounded-md border border-white/20 bg-white/[0.06] font-mono text-[11px] text-fg/80">7</div>
          <div className="h-12 w-9 rounded-md border border-violet/40 bg-[repeating-linear-gradient(45deg,rgba(183,166,247,0.2)_0_3px,transparent_3px_6px)]" />
        </div>
      </Window>
    </div>
  );
}

function Window({ className, title, children }: { className: string; title: string; children: ReactNode }) {
  return (
    <div className={`absolute overflow-hidden rounded-lg border border-white/12 bg-surface-2 shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-1.5">
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="ml-1.5 font-mono text-[9px] text-subtle">{title}</span>
      </div>
      {children}
    </div>
  );
}
