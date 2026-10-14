import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/layout/page-transition";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="page-frame gutter flex min-h-svh flex-col items-start justify-center gap-8 pb-24">
      <p className="display-condensed text-mega text-stroke" aria-hidden="true">
        404
      </p>
      <h1 className="display-condensed text-headline text-ink">This page does not exist</h1>
      <p className="max-w-md font-serif text-2xl italic text-ink-soft">
        The link may be old, or the address may have a typo. Head back home or browse the projects.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <TransitionLink href="/">Go home</TransitionLink>
        </Button>
        <Button asChild size="lg" variant="outline">
          <TransitionLink href="/projects">View My Work</TransitionLink>
        </Button>
      </div>
    </div>
  );
}
