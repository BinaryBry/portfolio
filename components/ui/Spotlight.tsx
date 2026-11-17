"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A card wrapper with a soft highlight that follows the cursor. */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }
  return (
    <div onMouseMove={onMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
