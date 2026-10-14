"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";

import { getNavItem } from "@/content/navigation";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

type Phase = "idle" | "cover" | "reveal";

interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

const curtain: Variants = {
  idle: { y: "100%", transition: { duration: 0 } },
  cover: { y: "0%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  reveal: { y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};

const COVER_MS = 620;

function labelFor(href: string): string {
  const clean = href.split("#")[0]?.split("?")[0] ?? href;
  const nav = getNavItem(clean);
  if (nav) return nav.title;
  const slug = clean.replace(/^\/projects\//, "");
  const project = projects.find((p) => p.slug === slug);
  return project?.title ?? site.name;
}

/**
 * Wraps the app and plays a curtain wipe between pages. The curtain names the destination, then
 * lifts away once the new route has rendered. Reduced-motion visitors navigate instantly.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState<string>(site.name);
  const pending = useRef<string | null>(null);
  const timer = useRef<number | null>(null);

  const navigate = useCallback(
    (href: string) => {
      const target = href.split("#")[0]?.split("?")[0] ?? href;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce || target === pathname || pending.current) {
        if (target !== pathname) router.push(href);
        return;
      }

      pending.current = href;
      setLabel(labelFor(href));
      setPhase("cover");
      timer.current = window.setTimeout(() => router.push(href), COVER_MS);
      // Safety net: never leave the curtain down if the route does not change.
      window.setTimeout(() => {
        if (pending.current === href) {
          pending.current = null;
          setPhase("reveal");
        }
      }, 5000);
    },
    [pathname, router],
  );

  // When the route has changed, lift the curtain.
  useEffect(() => {
    if (pending.current) {
      pending.current = null;
      const id = window.setTimeout(() => setPhase("reveal"), 80);
      return () => window.clearTimeout(id);
    }
  }, [pathname]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-night-2"
        style={{ y: "100%" }}
        variants={curtain}
        initial="idle"
        animate={phase}
        onAnimationComplete={(definition) => {
          if (definition === "reveal") setPhase("idle");
        }}
      >
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <span className="font-serif text-[clamp(2.25rem,7vw,6rem)] italic leading-none text-signal">
            {label}
          </span>
          <span className="h-px w-24 bg-line-strong" />
          <span className="text-sm text-ink-soft">{site.name}</span>
        </div>
      </motion.div>
      {phase !== "idle" ? (
        <div className="fixed inset-0 z-[94] cursor-progress" aria-hidden="true" />
      ) : null}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return context;
}

type TransitionLinkProps = ComponentProps<typeof Link>;

/** Drop-in replacement for next/link that plays the page curtain for internal navigation. */
export function TransitionLink({ href, onClick, children, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const url = typeof href === "string" ? href : (href.pathname ?? "");
  const isInternal = url.startsWith("/") && !url.startsWith("//");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      !isInternal ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      props.target === "_blank"
    ) {
      return;
    }
    event.preventDefault();
    navigate(url);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
