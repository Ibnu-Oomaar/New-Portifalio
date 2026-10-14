import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know that the custom fluid sizes declared in globals.css
 * (text-mega, text-display, …) are font sizes. Without this it treats them as colours and
 * silently drops them whenever a colour class such as `text-ink` is present.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["mega", "display", "headline", "title", "lede"] }],
    },
  },
});

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Deterministic pseudo-random generator (mulberry32) so scenes render identically on every load. */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** True when a URL string is usable (non-empty, not a placeholder marker). */
export function isConfiguredUrl(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
