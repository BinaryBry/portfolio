/**
 * Illustrative artwork for project cards. These are drawings, not screenshots,
 * so they never pretend to show a real interface. Real screenshots go in
 * `images` in data/projects.ts and replace these on project pages.
 */
export function ProjectArt({ slug }: { slug: string }) {
  switch (slug) {
    case "deal-or-no-deal":
      return <CasesArt />;
    default:
      return <div className="h-full w-full grain" />;
  }
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
