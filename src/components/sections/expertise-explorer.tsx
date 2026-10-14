"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { sourceLabels } from "@/content/expertise";
import type { SkillSource, StackLayer } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StackCanvas } from "@/components/three/stack-canvas";
import type { StackControl } from "@/components/three/stack-scene";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sourceVariant: Record<SkillSource, "default" | "outline" | "muted"> = {
  core: "default",
  portfolio: "outline",
  tooling: "muted",
};

/**
 * The 3D stack beside the list of layers. Scrolling (or hovering / focusing) a layer lights up
 * the matching slab, so the model and the content always explain each other.
 */
export function ExpertiseExplorer({ layers }: { layers: StackLayer[] }) {
  const root = useRef<HTMLDivElement>(null);
  const control = useRef<StackControl>({ active: null, spread: 0.3 });
  const [active, setActive] = useState<number | null>(null);

  const select = useCallback((index: number | null) => {
    control.current.active = index;
    setActive(index);
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((element, index) => {
          ScrollTrigger.create({
            trigger: element,
            start: "top 62%",
            end: "bottom 62%",
            onEnter: () => select(index),
            onEnterBack: () => select(index),
            onLeaveBack: () => {
              if (index === 0) select(null);
            },
          });
        });

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            control.current.spread = 0.25 + Math.sin(self.progress * Math.PI) * 0.7;
          },
        });
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [select] },
  );

  return (
    <div ref={root} className="grid lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="relative h-[52vh] lg:sticky lg:top-0 lg:h-screen">
          <StackCanvas controlRef={control} offset={0} scale={0.82} />
        </div>
      </div>

      <div className="gutter lg:col-span-6 lg:pl-0">
        <ul className="mb-6 flex flex-wrap gap-2 pt-4" aria-label="Legend">
          {(Object.keys(sourceLabels) as SkillSource[]).map((source) => (
            <li key={source}>
              <Badge variant={sourceVariant[source]}>{sourceLabels[source]}</Badge>
            </li>
          ))}
        </ul>

        {layers.map((layer, index) => (
          <article
            key={layer.id}
            data-layer
            tabIndex={0}
            onMouseEnter={() => select(index)}
            onFocus={() => select(index)}
            className={cn(
              "flex min-h-[60vh] flex-col justify-center gap-6 border-t border-line py-16 outline-none transition-opacity duration-500 lg:min-h-[78vh]",
              active !== null && active !== index ? "lg:opacity-40" : "opacity-100",
            )}
            aria-labelledby={`layer-${layer.id}`}
          >
            <h2 id={`layer-${layer.id}`} className="display-condensed text-display text-ink">
              {layer.name}
            </h2>
            <p className="max-w-md font-serif text-[clamp(1.4rem,2.2vw,2rem)] italic leading-[1.2] text-ink-soft">
              {layer.summary}
            </p>
            <ul className="flex flex-wrap gap-2.5" aria-label={`${layer.name} technologies`}>
              {layer.tools.map((tool) => (
                <li key={tool.name}>
                  <Badge variant={sourceVariant[tool.source]} className="px-5 py-2 text-base">
                    {tool.name}
                  </Badge>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
