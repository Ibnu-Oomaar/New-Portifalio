"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { TransitionLink } from "@/components/layout/page-transition";
import { DownloadCvButton } from "@/components/shared/download-cv-button";
import { SocialLinks } from "@/components/shared/social-links";
import { StackCanvas } from "@/components/three/stack-canvas";
import type { StackControl } from "@/components/three/stack-scene";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * First screen. The name and title are the visual focus; the 3D stack sits behind them and
 * "explodes" apart as the page scrolls away from the hero.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const control = useRef<StackControl>({ active: null, spread: 0 });

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            control.current.spread = self.progress;
          },
        });
        gsap.to(copy.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="gutter relative isolate flex min-h-svh flex-col overflow-hidden pb-10 pt-28"
    >
      <div className="grid-lines -z-20" aria-hidden="true" />

      {/* 3D stack */}
      <div className="absolute inset-0 -z-10 opacity-70 md:opacity-100">
        <StackCanvas controlRef={control} offset={0.2} scale={0.9} dropOnNarrow />
      </div>

      <div ref={copy} className="relative z-10 flex flex-1 flex-col justify-center">
        <h1 className="flex flex-col">
          <span className="sr-only">
            {site.name}, {site.title}
          </span>
          <span aria-hidden="true" className="display-condensed text-mega text-ink">
            <SplitReveal text="ABDIRIZAK" delay={0.25} stagger={0.05} />
          </span>
          <span
            aria-hidden="true"
            className="flex flex-col gap-4 md:flex-row md:items-end md:gap-[3vw] md:pl-[11vw]"
          >
            <span className="display-condensed text-mega text-ink">
              <SplitReveal text="MOKTAR" delay={0.7} stagger={0.05} />
            </span>
            <span className="display-condensed flex flex-col pb-[0.6vw] text-[clamp(1.5rem,3.2vw,3.5rem)] leading-[0.92] text-signal">
              <SplitReveal text="FULL-STACK" delay={1.25} stagger={0.03} className="block" />
              <SplitReveal text="DEVELOPER" delay={1.4} stagger={0.03} className="block" />
            </span>
          </span>
        </h1>

        <motion.div
          className="mt-10 flex max-w-2xl flex-col gap-8 md:mt-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-serif text-[clamp(1.6rem,3vw,2.9rem)] italic leading-[1.08] text-ink">
            {site.statement}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <TransitionLink href="/projects">
                View My Work
                <ArrowUpRight aria-hidden="true" />
              </TransitionLink>
            </Button>
            <DownloadCvButton variant="outline" size="lg" />
            <Button asChild size="lg" variant="ghost">
              <TransitionLink href="/contact">
                <Mail aria-hidden="true" />
                Contact Me
              </TransitionLink>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 mt-12 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.3 }}
      >
        <SocialLinks />
        <p className="hidden items-center gap-3 text-sm text-ink-soft sm:flex">
          Scroll
          <ArrowDown className="size-4" aria-hidden="true" />
        </p>
      </motion.div>
    </section>
  );
}
