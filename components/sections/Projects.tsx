import Link from "next/link";
import { ArrowRight, Check, Circle } from "lucide-react";
import { featuredProject as fp, otherProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StagePill, Tag } from "@/components/ui/Tag";
import { Spotlight } from "@/components/ui/Spotlight";
import { CareerPilotDemo } from "@/components/projects/CareerPilotDemo";
import { ProjectArt } from "@/components/projects/ProjectArt";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { Button } from "@/components/ui/Button";

// One secondary project gets a wide card; two or three share a row.
const gridCols: Record<number, string> = {
  0: "hidden",
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export function Projects() {
  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve built, <span className="text-muted">and how I think about them.</span>
            </>
          }
          description="Each project has its own page covering the problem, how it's built, what went wrong, and what I'd do next."
        />

        {/* Featured: CareerPilot */}
        <Reveal>
          <article aria-labelledby="featured-title" className="rounded-[28px] border border-line bg-gradient-to-b from-white/[0.035] to-transparent p-5 md:p-10">
            <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-pink">Featured · {fp.kicker}</span>
                  <StagePill stage={fp.stage} label={fp.stageLabel} />
                </div>
                <h3 id="featured-title" className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-fg md:text-[56px] md:leading-none">
                  {fp.name}
                </h3>
                <p className="mt-4 text-pretty text-xl leading-snug tracking-[-0.02em] text-fg/85">{fp.tagline}</p>
                <p className="mt-5 text-pretty leading-relaxed text-muted">{fp.problem}</p>

                <div className="mt-7 flex flex-wrap gap-1.5">
                  {fp.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={`/projects/${fp.slug}`}>
                    Read the case study
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
                <div className="mt-4">
                  <ProjectLinks links={fp.links} size="sm" />
                </div>
              </div>

              <div className="grid content-start gap-8 sm:grid-cols-2 md:grid-cols-1">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Works today</p>
                  <ul className="mt-4 space-y-3">
                    {fp.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[14.5px] leading-snug text-fg/90">
                        <Check className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                {fp.planned?.length ? (
                  <div className="rounded-2xl border border-dashed border-line-strong p-5">
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                      Planned <span className="rounded-full bg-violet/10 px-2 py-0.5 normal-case tracking-normal text-violet">not built yet</span>
                    </p>
                    <ul className="mt-4 space-y-3">
                      {fp.planned.map((f) => (
                        <li key={f} className="flex gap-3 text-[14px] leading-snug text-muted">
                          <Circle className="mt-1 size-3 shrink-0 text-violet/70" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-10 md:mt-14">
              <p className="mb-4 flex items-center gap-2 text-[13px] text-muted">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Try it</span>
                Add, edit, filter, and delete applications. The dashboard updates live.
              </p>
              <CareerPilotDemo />
            </div>
          </article>
        </Reveal>

        {/* Other projects */}
        <div className={`mt-6 grid gap-6 ${gridCols[Math.min(otherProjects.length, 3)]}`}>
          {otherProjects.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * i} className="h-full">
              <Spotlight className="group h-full rounded-[24px] border border-line bg-surface/60 transition-colors duration-500 hover:border-line-strong">
                <Link
                  href={`/projects/${p.slug}`}
                  className={`flex h-full flex-col ${otherProjects.length === 1 ? "md:grid md:grid-cols-[1.1fr_1fr] md:items-center" : ""}`}
                >
                  <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[18px] border border-line bg-ink/60">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
                      <ProjectArt slug={p.slug} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{p.kicker}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-fg">{p.name}</h3>
                    <p className="mt-2.5 text-pretty text-[14.5px] leading-relaxed text-muted">{p.tagline}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <span className="mt-auto flex items-center gap-1.5 pt-6 text-[13.5px] font-medium text-fg">
                      Case study
                      <ArrowRight className="size-4 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-pink" />
                    </span>
                  </div>
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
