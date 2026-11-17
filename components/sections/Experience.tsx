import { GraduationCap } from "lucide-react";
import { education, experience, retailSummary } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Todo";
import { isFilled, isVisible } from "@/lib/utils";

export function Experience() {
  const main = experience.filter((e) => e.kind !== "work");
  const retail = experience.filter((e) => e.kind === "work");
  // If every retail role has the same filled-in title, show it once as the subtitle
  const retailRoles = [...new Set(retail.map((r) => r.role).filter(isFilled))];

  return (
    <section id="experience" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="04" eyebrow="Experience & education" title="Where I've learned so far." />

        <div className="grid gap-12 md:grid-cols-[1.4fr_0.6fr] md:gap-16">
          {/* Timeline */}
          <ol className="relative border-l border-line">
            {main.map((item, i) => (
              <Reveal as="li" key={item.org + i} delay={0.05 * i} className="relative pb-12 pl-8">
                <span
                  aria-hidden
                  className={`absolute -left-[5px] top-1.5 size-[9px] rounded-full border ${
                    item.kind === "tech" ? "border-pink bg-pink/30" : "border-violet bg-ink"
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-fg">{item.org}</h3>
                  <p className="font-mono text-[12px] text-subtle">
                    <Text value={item.dates} />
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                </div>
                <p className="mt-1 text-[15px] text-pink/90">
                  <Text value={item.role} />
                </p>
                {item.points.length ? (
                  <ul className="mt-4 space-y-2">
                    {item.points.filter(isVisible).map((pt, j) => (
                      <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-line-strong" />
                        <Text value={pt} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}

            {/* Retail */}
            <Reveal as="li" className="relative pl-8">
              <span aria-hidden className="absolute -left-[5px] top-1.5 size-[9px] rounded-full border border-white/25 bg-ink" />
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-fg">
                {retail.map((r) => r.org).join(" · ")}
              </h3>
              <p className="mt-1 text-[15px] text-pink/90">
                {retailRoles.length === 1 ? retailRoles[0] : "Retail"}
              </p>
              <ul className="mt-3 space-y-1">
                {retail.filter((r) => isVisible(r.role)).map((r) => (
                  <li key={r.org} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
                    <span className="text-fg/85">{r.org}</span>
                    {retailRoles.length !== 1 ? <Text value={r.role} className="text-muted" /> : null}
                    <span className="font-mono text-[12px] text-subtle">
                      <Text value={r.dates} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{retailSummary}</p>
            </Reveal>
          </ol>

          {/* Education */}
          <Reveal delay={0.1}>
            <div className="rounded-[22px] border border-line bg-surface/50 p-6 md:sticky md:top-28">
              <div className="flex size-10 items-center justify-center rounded-xl border border-line-strong bg-ink">
                <GraduationCap className="size-5 text-violet" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.02em] text-fg">{education.school}</h3>
              <p className="mt-1 text-[14.5px] text-muted">{education.degree}</p>
              <p className="mt-1 font-mono text-[12px] text-subtle">
                {education.status} · {education.location}
              </p>

              {education.honors.length ? (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Honors</p>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-fg/85">
                    {education.honors.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {education.coursework.length ? (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Relevant coursework</p>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-fg/85">
                    {education.coursework.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
