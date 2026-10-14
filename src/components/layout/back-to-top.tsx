"use client";

import type { ReactNode } from "react";

export function BackToTop({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 text-ink transition-colors hover:text-signal"
      onClick={() => {
        const lenis = window.__lenis;
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </button>
  );
}
