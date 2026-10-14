"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface SplitRevealProps {
  /** The exact text to display. It is also exposed to assistive tech as a single label. */
  text: string;
  className?: string;
  /** Delay before the first character starts (seconds). */
  delay?: number;
  /** Stagger between characters (seconds). */
  stagger?: number;
  /** Play when scrolled into view instead of on load. */
  whenInView?: boolean;
  /** Element to render. */
  as?: "span" | "div";
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const char: Variants = {
  hidden: { y: "108%", rotate: 4 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Animated character-by-character reveal used for the name and large headlines.
 * Characters slide up out of an overflow mask. With reduced motion the CSS in globals.css
 * removes the transform, so the final text is shown immediately.
 */
export function SplitReveal({
  text,
  className,
  delay = 0.15,
  stagger = 0.045,
  whenInView = false,
  as = "span",
}: SplitRevealProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  const trigger = whenInView
    ? { whileInView: "visible", viewport: { once: true, amount: 0.6 } }
    : { animate: "visible" };

  return (
    <Tag
      className={cn("inline-block", className)}
      aria-label={text}
      initial="hidden"
      variants={container(delay, stagger)}
      {...trigger}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} aria-hidden="true" className="inline-block whitespace-nowrap">
          {Array.from(word).map((character, index) => (
            <span key={`${character}-${index}`} className="reveal-mask">
              <motion.span data-reveal-char variants={char} className="inline-block will-change-transform">
                {character}
              </motion.span>
            </span>
          ))}
          {wordIndex < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
