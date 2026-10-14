"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * A soft follower ring for fine pointers. The native cursor is never hidden.
 * Elements can opt in to a label with `data-cursor="View case study"`.
 * Interactive elements (links, buttons) enlarge the ring automatically.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability detection is only possible on the client
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    if (!ring) return;

    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });
    const moveX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const moveY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      gsap.to(ring, { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, [role='button'], summary, label");

      if (labelled) {
        setLabel(labelled.dataset.cursor ?? "");
        gsap.to(ring, { scale: 1, width: 104, height: 104, duration: 0.45, ease: "expo.out" });
        ring.dataset.state = "label";
      } else if (interactive) {
        setLabel("");
        gsap.to(ring, { scale: 1, width: 56, height: 56, duration: 0.4, ease: "expo.out" });
        ring.dataset.state = "link";
      } else {
        setLabel("");
        gsap.to(ring, { scale: 1, width: 22, height: 22, duration: 0.4, ease: "expo.out" });
        ring.dataset.state = "idle";
      }
    };

    const onLeave = () => gsap.to(ring, { opacity: 0, duration: 0.25 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      data-state="idle"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex size-[22px] items-center justify-center rounded-full border border-ink/70 text-center text-[0.8rem] font-medium leading-tight text-signal-ink opacity-0 mix-blend-difference transition-[background-color,border-color] duration-300 data-[state=label]:border-transparent data-[state=label]:bg-signal data-[state=link]:border-signal"
    >
      <span className="px-3">{label}</span>
    </div>
  );
}
