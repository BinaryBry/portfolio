import type { Content } from "@/lib/types";
import { SHOW_TODOS, isFilled, isTodo } from "@/lib/utils";

/**
 * Renders a string as-is, or a TODO as a dashed amber note in development.
 * In production a TODO renders nothing.
 */
export function TodoNote({ text, className = "" }: { text: string; className?: string }) {
  if (!SHOW_TODOS) return null;
  return (
    <span
      className={`inline-flex items-start gap-2 rounded-md border border-dashed border-todo/50 bg-todo/[0.06] px-2.5 py-1.5 font-mono text-[12px] leading-relaxed text-todo ${className}`}
    >
      <span aria-hidden className="mt-px shrink-0 font-semibold">TODO</span>
      <span className="text-todo/90">{text}</span>
    </span>
  );
}

export function Text({ value, className }: { value: Content | undefined; className?: string }) {
  if (isFilled(value)) return <span className={className}>{value}</span>;
  if (isTodo(value)) return <TodoNote text={value.todo} />;
  return null;
}
