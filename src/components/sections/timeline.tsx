"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { TimelineEntry } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TimelineProps {
  entries: TimelineEntry[];
  /** Name of the content file shown on placeholder badges. */
  source: string;
  emptyMessage: string;
}

/**
 * A vertical timeline. The spine draws itself down as the visitor scrolls, which tells the
 * reader the entries are a sequence in time.
 */
export function Timeline({ entries, source, emptyMessage }: TimelineProps) {
  const root = useRef<HTMLOListElement>(null);
  const spine = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          spine.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: true },
          },
        );
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [entries.length] },
  );

  if (!entries.length) {
    return <p className="border-t border-line pt-6 text-ink-soft">{emptyMessage}</p>;
  }

  return (
    <ol ref={root} className="relative flex flex-col">
      <span aria-hidden="true" className="absolute bottom-0 left-[0.45rem] top-2 w-px bg-line" />
      <span
        ref={spine}
        aria-hidden="true"
        className="absolute bottom-0 left-[0.45rem] top-2 w-px origin-top bg-signal"
      />
      {entries.map((entry) => (
        <li key={entry.id} className="relative grid gap-3 pb-14 pl-10 last:pb-0 md:grid-cols-[1fr_2fr] md:gap-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-2 size-[0.95rem] rounded-full border border-signal bg-night"
          />
          <div className="flex flex-col gap-2">
            <p className="text-ink-soft">{entry.period}</p>
            {entry.placeholder ? <PlaceholderBadge file={source} /> : null}
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="display-condensed text-title text-ink">{entry.title}</h3>
            <p className="font-serif text-xl italic text-ink-soft">{entry.organisation}</p>
            <p className="max-w-xl text-ink-soft">{entry.summary}</p>
            {entry.tags?.length ? (
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {entry.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="muted">{tag}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
