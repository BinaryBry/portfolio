import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-subtle">
        <span className="text-pink">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-fg md:text-[44px] md:leading-[1.05]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}
