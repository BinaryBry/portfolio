import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Circle } from "lucide-react";
import type { Project } from "@/lib/types";
import { projects } from "@/data/projects";
import { anyVisible, isVisible } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { StagePill, Tag } from "@/components/ui/Tag";
import { Text, TodoNote } from "@/components/ui/Todo";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectArt } from "./ProjectArt";
import { CareerPilotDemo } from "./CareerPilotDemo";

export function ProjectDetail({ project: p }: { project: Project }) {
  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];

  const challenges = p.challenges.filter((c) => isVisible(c.challenge));

  const sections: { title: string; body: ReactNode }[] = [];

  sections.push({
    title: p.problemHeading ?? "The problem",
    body: <p className="text-pretty text-[17px] leading-[1.75] text-muted">{p.problem}</p>,
  });

  if (isVisible(p.contribution)) {
    sections.push({
      title: "My contribution",
      body: (
        <p className="text-pretty text-[17px] leading-[1.75] text-muted">
          <Text value={p.contribution} />
        </p>
      ),
    });
  }

  sections.push({
    title: p.subprojects ? "What's in the collection" : "What I built",
    body: (
      <div className="space-y-8">
        <ul className="grid gap-3 sm:grid-cols-2">
          {p.features.map((f) => (
            <li key={f} className="flex gap-3 rounded-xl border border-line bg-surface/50 p-4 text-[15px] leading-snug text-fg/90">
              <Check className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        {p.subprojects ? (
          <div className="grid gap-4 md:grid-cols-3">
            {p.subprojects.map((s) => (
              <div key={s.name} className="rounded-2xl border border-line bg-surface/50 p-5">
                <h4 className="text-lg font-semibold tracking-[-0.02em] text-fg">{s.name}</h4>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  <Text value={s.description} />
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.concepts.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
                {s.github ? (
                  <div className="mt-4">
                    <ProjectLinks links={{ github: s.github }} size="sm" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        {p.planned?.length ? (
          <div className="rounded-2xl border border-dashed border-line-strong p-6">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              Planned <span className="rounded-full bg-violet/10 px-2 py-0.5 normal-case tracking-normal text-violet">not built yet</span>
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.planned.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-snug text-muted">
                  <Circle className="mt-1 size-3 shrink-0 text-violet/70" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            {p.roadmap ? (
              <ol className="mt-7 grid gap-2 sm:grid-cols-4">
                {p.roadmap.map((r, i) => (
                  <li
                    key={r.label}
                    className={`rounded-xl border px-3.5 py-3 ${r.current ? "border-pink/40 bg-pink/[0.06]" : "border-line"}`}
                  >
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                      Phase {i + 1}
                      {r.current ? <span className="ml-2 text-pink">now</span> : null}
                    </p>
                    <p className={`mt-1 text-[14px] ${r.current ? "text-fg" : "text-muted"}`}>{r.label}</p>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : null}
      </div>
    ),
  });

  if (p.architecture.length) {
    sections.push({
      title: "How it's built",
      body: (
        <div className="grid gap-4 md:grid-cols-3">
          {p.architecture.map((a, i) => (
            <div key={a.title} className="rounded-2xl border border-line bg-surface/50 p-5">
              <p className="font-mono text-[11px] text-pink">0{i + 1}</p>
              <h4 className="mt-2 text-[16px] font-semibold tracking-[-0.02em] text-fg">{a.title}</h4>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (challenges.length) {
    sections.push({
      title: "Challenges & how I solved them",
      body: (
        <ol className="space-y-4">
          {challenges.map((c, i) => (
            <li key={i} className="grid gap-4 rounded-2xl border border-line bg-surface/50 p-5 md:grid-cols-2 md:gap-8 md:p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">Challenge</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-fg/90">
                  <Text value={c.challenge} />
                </p>
              </div>
              <div className="md:border-l md:border-line md:pl-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet">Approach</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">
                  <Text value={c.approach} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      ),
    });
  }

  if (anyVisible(p.results)) {
    sections.push({
      title: "Results",
      body: (
        <ul className="space-y-3">
          {p.results.filter(isVisible).map((r, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-fg/90">
              <span aria-hidden className="mt-[13px] h-px w-4 shrink-0 bg-pink" />
              <Text value={r} />
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (anyVisible(p.learned)) {
    sections.push({
      title: "What I learned",
      body: (
        <ul className="space-y-3">
          {p.learned.filter(isVisible).map((l, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-muted">
              <span aria-hidden className="mt-[13px] h-px w-4 shrink-0 bg-violet" />
              <Text value={l} />
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (p.next?.length) {
    sections.push({
      title: "What's next",
      body: (
        <div className="flex flex-wrap gap-2">
          {p.next.map((n) => (
            <span key={n} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] text-fg/85">
              {n}
            </span>
          ))}
        </div>
      ),
    });
  }

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <Link href="/#work" className="group inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        All work
      </Link>

      <header className="mt-10 max-w-3xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-pink">{p.kicker}</span>
            <StagePill stage={p.stage} label={p.stageLabel} />
          </div>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-fg md:text-7xl">{p.name}</h1>
          <p className="mt-5 text-pretty text-xl leading-snug tracking-[-0.02em] text-fg/80 md:text-2xl">{p.tagline}</p>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted">{p.summary}</p>
          <div className="mt-8">
            <ProjectLinks links={p.links} />
          </div>
        </Reveal>
      </header>

      {/* Media */}
      <Reveal className="mt-14">
        {p.slug === "careerpilot" ? (
          <CareerPilotDemo />
        ) : p.images.length ? null : (
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-line bg-surface/60 md:aspect-[16/8]">
            <div className="absolute inset-y-0 left-1/2 aspect-[16/10] h-full -translate-x-1/2">
              <ProjectArt slug={p.slug} />
            </div>
            <p className="absolute bottom-3 right-4 font-mono text-[10.5px] text-subtle">Illustration</p>
          </div>
        )}
        {p.images.length ? (
          <div className={`grid gap-4 ${p.slug === "careerpilot" ? "mt-6" : ""} ${p.images.length > 1 ? "md:grid-cols-2" : ""}`}>
            {p.images.map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-line bg-surface">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-top" />
                </div>
                {img.caption ? <figcaption className="mt-2 text-[13px] text-subtle">{img.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : p.imageTodo ? (
          <div className="mt-4">
            <TodoNote text={p.imageTodo} />
          </div>
        ) : null}
      </Reveal>

      <div className="mt-20 grid gap-12 md:grid-cols-[240px_1fr] md:gap-16">
        <aside>
          <div className="space-y-6 md:sticky md:top-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">At a glance</p>
            <dl className="space-y-4">
              {p.glance.filter((g) => isVisible(g.value)).map((g) => (
                <div key={g.label} className="border-b border-line pb-4">
                  <dt className="text-[12.5px] text-subtle">{g.label}</dt>
                  <dd className="mt-1 text-[15px] text-fg">
                    <Text value={g.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="text-[12.5px] text-subtle">Stack</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-20">
          {sections.map((s, i) => (
            <Reveal key={s.title} as="section">
              <h2 className="mb-6 flex items-baseline gap-4 text-2xl font-semibold tracking-[-0.035em] text-fg md:text-[32px]">
                <span className="font-mono text-[12px] font-normal tracking-normal text-pink">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Next project */}
      <Link
        href={`/projects/${next.slug}`}
        className="group mt-28 flex items-center justify-between gap-6 rounded-[24px] border border-line bg-surface/50 p-6 transition-colors hover:border-line-strong md:p-10"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Next project</p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-fg md:text-5xl">{next.name}</p>
          <p className="mt-2 text-muted">{next.tagline}</p>
        </div>
        <ArrowRight className="size-8 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-pink" />
      </Link>
    </article>
  );
}
