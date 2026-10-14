"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { ProcessStage } from "@/content/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The development process as a sequence of stages. On large screens the stages are pinned and
 * travel sideways as the visitor scrolls. On small screens, or with reduced motion, they simply
 * stack vertically so nothing depends on the scroll effect.
 */
export function ProcessTrack({ stages }: { stages: ProcessStage[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const element = track.current;
        if (!element) return;
        const distance = () => Math.max(0, element.scrollWidth - window.innerWidth);

        const tween = gsap.to(element, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.to(bar.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
      <ol
        ref={track}
        className="gutter flex flex-col gap-16 lg:w-max lg:flex-row lg:gap-0 lg:pr-[10vw]"
        aria-label="Development process stages"
      >
        {stages.map((stage, index) => (
          <li
            key={stage.id}
            className={cn(
              "flex flex-col gap-6 border-t border-line pt-8 lg:w-[min(46vw,40rem)] lg:shrink-0 lg:border-l lg:border-t-0 lg:px-[3vw] lg:pt-0",
              index === 0 && "lg:border-l-0 lg:pl-0",
            )}
          >
            <p className="display-condensed text-[clamp(5rem,13vw,13rem)] leading-[0.8] text-stroke" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="display-condensed text-headline text-ink">
              <span className="sr-only">Step {index + 1}: </span>
              {stage.name}
            </h2>
            <p className="max-w-md font-serif text-[clamp(1.35rem,1.8vw,1.75rem)] italic leading-[1.2] text-ink-soft">
              {stage.summary}
            </p>
            <ul className="flex max-w-md flex-col gap-2.5 text-ink">
              {stage.actions.map((action) => (
                <li key={action} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-signal" />
                  {action}
                </li>
              ))}
            </ul>
            <p className="max-w-md border-t border-line pt-5 text-ink-soft">
              <span className="text-ink">You get: </span>
              {stage.deliverable}
            </p>
          </li>
        ))}
      </ol>

      <div className="gutter mt-10 hidden lg:block" aria-hidden="true">
        <div className="h-px w-full bg-line">
          <span ref={bar} className="block h-px origin-left scale-x-0 bg-signal" />
        </div>
      </div>
    </div>
  );
}
