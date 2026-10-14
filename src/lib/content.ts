import { site } from "@/content/site";
import type { Placeholderable } from "@/content/types";

/** Entries that should be shown right now. Placeholders are hidden when `site.showPlaceholders` is false. */
export function visibleItems<T extends Placeholderable>(items: readonly T[]): T[] {
  const showPlaceholders: boolean = site.showPlaceholders;
  return items.filter((item) => showPlaceholders || !item.placeholder);
}
