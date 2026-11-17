import { ArrowUpRight, Play } from "lucide-react";
import type { ProjectLink } from "@/lib/types";
import { isFilled, isTodo } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { TodoNote } from "@/components/ui/Todo";

/** GitHub + live demo buttons. Missing links show as TODOs locally and disappear in production. */
export function ProjectLinks({ links, size = "md" }: { links: ProjectLink; size?: "sm" | "md" }) {
  const small = size === "sm" ? "h-9 px-4 text-[13px]" : "";
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {isFilled(links.demo) ? (
        <Button href={links.demo} external className={small}>
          <Play className="size-3.5" />
          {links.demoLabel ?? "Live demo"}
          <ArrowUpRight className="size-3.5 opacity-60" />
        </Button>
      ) : null}
      {isFilled(links.github) ? (
        <Button href={links.github} variant="secondary" external className={small}>
          <GitHubIcon className="size-4" />
          View code
        </Button>
      ) : null}
      {isTodo(links.demo) ? <TodoNote text={links.demo.todo} /> : null}
      {isTodo(links.github) ? <TodoNote text={links.github.todo} /> : null}
    </div>
  );
}
