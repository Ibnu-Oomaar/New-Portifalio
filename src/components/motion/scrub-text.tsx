"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrubTextProps {
  text: string;
  className?: string;
}

/**
 * A statement whose words light up as the visitor scrolls through it.
 * The text stays fully readable without JavaScript or with reduced motion.
 */
export function ScrubText({ text, className }: ScrubTextProps) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      if (!words.length) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: root.current,
              start: "top 82%",
              end: "bottom 48%",
              scrub: 0.6,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <p ref={root} className={cn(className)} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} data-word aria-hidden="true" className="inline-block">
          {word}
          &nbsp;
        </span>
      ))}
    </p>
  );
}
