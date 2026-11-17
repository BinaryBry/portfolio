import type { Content, Todo } from "./types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Placeholders show in development and hide in production.
 * Set NEXT_PUBLIC_SHOW_TODOS=true to force them on (e.g. a private preview deploy).
 */
export const SHOW_TODOS =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_SHOW_TODOS === "true";

export function isTodo(value: Content | undefined | null): value is Todo {
  return typeof value === "object" && value !== null && "todo" in value;
}

export function isFilled(value: Content | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Should this piece of content render at all? */
export function isVisible(value: Content | undefined | null) {
  return isFilled(value) || (SHOW_TODOS && isTodo(value));
}

export function anyVisible(values: Array<Content | undefined | null>) {
  return values.some(isVisible);
}
