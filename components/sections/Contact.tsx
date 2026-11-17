import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { site } from "@/data/site";
import { isFilled, isTodo } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { TodoNote } from "@/components/ui/Todo";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-28 md:py-40">
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink/[0.07] to-violet/[0.08] blur-[110px]" />
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-subtle">
            <span className="text-pink">05</span> · Contact
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-fg md:text-[68px]">
            Let&apos;s build something <span className="text-gradient">worth shipping.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted">{site.seeking}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={`mailto:${site.email}?subject=Summer%202027%20opportunity`}>
              <Mail className="size-4" />
              Email me
            </Button>
            <CopyEmail email={site.email} />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button href={site.linkedin} variant="ghost" external className="h-10 px-4">
              <LinkedInIcon className="size-4" /> LinkedIn <ArrowUpRight className="size-3.5 opacity-60" />
            </Button>
            {isFilled(site.github) ? (
              <Button href={site.github} variant="ghost" external className="h-10 px-4">
                <GitHubIcon className="size-4" /> GitHub <ArrowUpRight className="size-3.5 opacity-60" />
              </Button>
            ) : null}
            <Button href={site.resume} variant="ghost" external className="h-10 px-4">
              <FileText className="size-4" /> Resume (PDF) <ArrowUpRight className="size-3.5 opacity-60" />
            </Button>
          </div>
          {isTodo(site.github) ? (
            <div className="mt-6">
              <TodoNote text={site.github.todo} />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
