"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { site } from "@/data/site";
import { featuredProject } from "@/data/projects";
import { isFilled, isTodo, SHOW_TODOS } from "@/lib/utils";
import { AgentGrid } from "@/components/hero/AgentGrid";
import { Button } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const facts = [
  { label: "Studying", value: `CS at ${site.schoolShort} · Class of ${site.classYear}` },
  { label: "Experience", value: "Microsoft cybersecurity mentorship, 2025" },
  { label: "From", value: `${site.hometown}` },
];

export function Hero() {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const currentPhase = featuredProject.roadmap?.findIndex((r) => r.current) ?? -1;

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <AgentGrid />
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[620px] rounded-full bg-violet/[0.07] blur-[120px]" />
        <div className="absolute -bottom-40 left-[-10%] h-[420px] w-[520px] rounded-full bg-pink/[0.05] blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-14 px-5 pb-20 pt-28 md:grid-cols-[1.35fr_0.85fr] md:gap-10 md:px-8 md:pt-32">
        <div>
          <motion.p
            {...fade(0.05)}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] py-1.5 pl-2.5 pr-3.5 text-[12.5px] text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-pink" />
            </span>
            Open to Summer 2027 internships
          </motion.p>

          <h1 className="text-fg">
            <motion.span {...fade(0.12)} className="mb-5 block text-[17px] font-medium tracking-[-0.01em] text-muted">
              {site.name}
              <span className="mx-2 text-subtle">/</span>
              <span className="text-subtle">{site.role}</span>
            </motion.span>
            <motion.span
              {...fade(0.2)}
              className="block text-balance text-[44px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[76px]"
            >
              {site.headline}
            </motion.span>
            <motion.span
              {...fade(0.3)}
              className="text-gradient mt-1 block text-balance pb-1 text-[44px] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[76px]"
            >
              {site.headlineSecond}
            </motion.span>
          </h1>

          <motion.p {...fade(0.42)} className="mt-8 max-w-xl text-pretty text-[17px] leading-relaxed text-muted md:text-lg">
            {site.intro}
          </motion.p>

          <motion.p {...fade(0.48)} className="mt-4 font-mono text-[12.5px] tracking-tight text-subtle">
            {site.focus.join("  •  ")}
          </motion.p>

          <motion.div {...fade(0.56)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/#work">
              View projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
            <Button href={site.resume} variant="secondary" download>
              <Download className="size-4" />
              Download resume
            </Button>
            <div className="ml-1 flex items-center gap-1">
              {isFilled(site.github) ? (
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
                >
                  <GitHubIcon className="size-[18px]" />
                </a>
              ) : SHOW_TODOS && isTodo(site.github) ? (
                <span
                  title={site.github.todo}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-dashed border-todo/50 text-todo"
                >
                  <GitHubIcon className="size-[18px]" />
                </span>
              ) : null}
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
              >
                <LinkedInIcon className="size-[18px]" />
              </a>
            </div>
          </motion.div>

          <motion.dl {...fade(0.66)} className="mt-14 grid max-w-xl grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{f.label}</dt>
                <dd className="mt-1.5 text-[14px] leading-snug text-fg/90">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[340px] md:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line-strong bg-surface shadow-[0_40px_120px_-40px_rgba(183,166,247,0.35)]">
            <Image
              src={site.headshot.src}
              alt={site.headshot.alt}
              fill
              priority
              sizes="(min-width: 768px) 380px, 340px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
            <p className="absolute bottom-4 left-4 font-mono text-[11px] tracking-tight text-fg/80">
              {site.campus} · {site.schoolShort}
            </p>
          </div>

          {/* Now building card */}
          <Link
            href={`/projects/${featuredProject.slug}`}
            className="group absolute -bottom-6 -left-4 w-[230px] rounded-2xl border border-line-strong bg-surface/90 p-4 backdrop-blur-xl transition-colors hover:border-pink/40 md:-left-10"
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle">Now building</p>
            <p className="mt-1 flex items-center justify-between text-[15px] font-medium tracking-[-0.02em] text-fg">
              {featuredProject.name}
              <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-pink" />
            </p>
            {featuredProject.roadmap ? (
              <div className="mt-3">
                <div className="flex gap-1">
                  {featuredProject.roadmap.map((r, i) => (
                    <span
                      key={r.label}
                      className={`h-1 flex-1 rounded-full ${
                        i < currentPhase || r.done ? "bg-pink" : i === currentPhase ? "bg-pink/60" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[12px] text-muted">
                  Phase {currentPhase + 1} of {featuredProject.roadmap.length}: {featuredProject.roadmap[currentPhase]?.label}
                </p>
              </div>
            ) : null}
          </Link>
        </motion.div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to projects"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-subtle transition-colors hover:text-fg md:block"
      >
        <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
