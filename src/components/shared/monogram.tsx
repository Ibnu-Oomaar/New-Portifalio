"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { site } from "@/content/site";

interface MonogramProps {
  /** Optional portrait path (inside /public). When empty a typographic monogram is shown. */
  portrait?: string;
  alt: string;
}

/** A tilting tile. Shows the portrait when one is configured, otherwise the initials. */
export function Monogram({ portrait, alt }: MonogramProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), { stiffness: 160, damping: 18 });

  return (
    <div className="perspective-[1000px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
          pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
        className="relative aspect-4/5 w-full overflow-hidden border border-line bg-night-2"
      >
        {portrait ? (
          <Image
            src={portrait}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover"
            priority
          />
        ) : (
          <>
            <div className="grid-lines" aria-hidden="true" />
            <p
              aria-hidden="true"
              className="display-condensed absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(9rem,24vw,22rem)] leading-[0.8] text-ink"
            >
              AM
            </p>
            <span className="absolute left-5 top-5 size-3 bg-signal" aria-hidden="true" />
            <p className="absolute inset-x-5 bottom-5 flex items-end justify-between text-sm text-ink-soft">
              <span>{site.name}</span>
              <span>{site.title}</span>
            </p>
            <span className="sr-only">Monogram of {site.name}</span>
          </>
        )}
      </motion.div>
    </div>
  );
}
