import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-fg text-ink hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_-8px_rgba(242,167,200,0.45)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.06]",
  ghost: "text-muted hover:text-fg",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  download,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[14px] font-medium tracking-[-0.01em] transition-all duration-300 ease-out-soft",
    styles[variant],
    className
  );

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
