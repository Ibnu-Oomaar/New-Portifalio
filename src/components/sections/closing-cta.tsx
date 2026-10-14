import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/layout/page-transition";

interface ClosingCtaProps {
  title: string;
  href: string;
  cta: string;
}

/** A large, quiet call to action that closes a page. */
export function ClosingCta({ title, href, cta }: ClosingCtaProps) {
  return (
    <section className="gutter py-[clamp(6rem,18vh,12rem)]">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-4xl font-serif text-[clamp(2.75rem,7.4vw,8rem)] italic leading-[0.95] text-ink">
          {title}
        </h2>
        <Button asChild size="lg">
          <TransitionLink href={href} data-cursor="Go">
            {cta}
            <ArrowUpRight aria-hidden="true" />
          </TransitionLink>
        </Button>
      </div>
    </section>
  );
}
