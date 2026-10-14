import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SplitReveal } from "@/components/motion/split-reveal";

interface PageIntroProps {
  /** The page's h1, rendered large and revealed character by character. */
  title: string;
  /** One or two sentences under the title. */
  lede?: string;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}

/**
 * The opening of every inner page. Titles are set in the condensed display face so the pages
 * share one voice, while each page composes the rest of its layout differently.
 */
export function PageIntro({ title, lede, className, titleClassName, children }: PageIntroProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <h1 className={cn("display-condensed text-display text-ink", titleClassName)}>
        <SplitReveal text={title} />
      </h1>
      {lede ? (
        <p className="max-w-2xl font-serif text-[clamp(1.5rem,2.6vw,2.4rem)] italic leading-[1.15] text-ink-soft">
          {lede}
        </p>
      ) : null}
      {children}
    </div>
  );
}
