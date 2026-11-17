import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11.5px] tracking-tight text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function StagePill({ stage, label }: { stage: "active" | "built"; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[11.5px] text-muted">
      <span className="relative flex size-1.5">
        {stage === "active" ? (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink opacity-60 motion-reduce:hidden" />
        ) : null}
        <span className={cn("relative inline-flex size-1.5 rounded-full", stage === "active" ? "bg-pink" : "bg-violet")} />
      </span>
      {label}
    </span>
  );
}
