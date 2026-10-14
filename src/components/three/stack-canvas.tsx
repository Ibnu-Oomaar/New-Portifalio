"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";
import { StackFallback } from "@/components/three/stack-fallback";
import type { StackControl } from "@/components/three/stack-scene";

const StackScene = dynamic(() => import("@/components/three/stack-scene"), {
  ssr: false,
  loading: () => <StackFallback />,
});

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("3D scene could not start, showing the still composition instead.", error);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

interface StackCanvasProps {
  controlRef: MutableRefObject<StackControl>;
  className?: string;
  /** Horizontal offset of the model as a fraction of the viewport width. */
  offset?: number;
  /** Overall size multiplier for wide viewports. */
  scale?: number;
  /** On narrow screens, move the model below the headline. */
  dropOnNarrow?: boolean;
}

/**
 * Client wrapper around the 3D scene. It only renders while on screen, honours reduced motion,
 * and swaps in the still composition if WebGL is missing or the scene errors.
 */
export function StackCanvas({ controlRef, className, offset, scale, dropOnNarrow }: StackCanvasProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- browser capability detection has to run after mount */
    setWebgl(hasWebGL());
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    /* eslint-enable react-hooks/set-state-in-effect */
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? true),
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className={cn("relative size-full", className)} aria-hidden="true">
      {webgl === false ? (
        <StackFallback />
      ) : (
        <SceneBoundary fallback={<StackFallback />}>
          <StackScene
            controlRef={controlRef}
            running={visible}
            reducedMotion={reduced}
            offset={offset}
            scale={scale}
            dropOnNarrow={dropOnNarrow}
          />
        </SceneBoundary>
      )}
    </div>
  );
}
