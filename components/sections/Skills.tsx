import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title={
            <>
              What I use, <span className="text-muted">and where I&apos;ve used it.</span>
            </>
          }
          description="No progress bars. Each skill links to the project or program where I actually used it. Open dots mean I'm still learning it."
        />

        <Reveal>
          <div className="mb-8 flex flex-wrap gap-5 text-[12.5px] text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-pink" /> Used in a project or program
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full border border-violet" /> Foundations / currently learning
            </span>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={0.05 * gi} className={cn("h-full", gi < 3 ? "lg:col-span-2" : "lg:col-span-3")}>
              <div className="h-full rounded-[22px] border border-line bg-surface/50 p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{group.title}</h3>
                <ul className="mt-5 divide-y divide-line">
                  {group.skills.map((s) => (
                    <li key={s.name} className="py-2.5">
                      <span className="flex items-center gap-2.5 text-[15px] text-fg">
                        <span
                          aria-hidden
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            s.learning ? "border border-violet" : "bg-pink"
                          )}
                        />
                        {s.name}
                        {s.learning ? <span className="sr-only">(learning)</span> : null}
                      </span>
                      {s.usedIn?.length ? (
                        <span className="mt-0.5 block pl-4 font-mono text-[11px] text-subtle">{s.usedIn.join(" · ")}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
