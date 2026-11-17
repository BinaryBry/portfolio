import Image from "next/image";
import { about } from "@/data/about";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <section id="about" className="relative border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="02" eyebrow="About" title={about.heading} />

        <div className="grid gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-20">
          <div className="space-y-6">
            <Reveal>
              <p className="text-pretty text-xl leading-relaxed tracking-[-0.015em] text-fg md:text-[22px]">{lead}</p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                <p className="text-pretty text-[17px] leading-[1.75] text-muted">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Off the keyboard</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {about.interests.map((it) => (
                    <li
                      key={it.label}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-[13.5px] text-fg/85 transition-colors hover:border-pink/30"
                    >
                      <span className="size-1 rounded-full bg-pink" aria-hidden />
                      {it.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure className="md:sticky md:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-line-strong bg-surface">
                <Image
                  src={about.photo.src}
                  alt={about.photo.alt}
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover object-[50%_40%]"
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11.5px] text-subtle">
                <span className="h-px w-5 bg-line-strong" />
                {about.photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
