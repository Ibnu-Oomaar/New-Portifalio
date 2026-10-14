import { ArrowUpRight } from "lucide-react";

import { navigation } from "@/content/navigation";
import { TransitionLink } from "@/components/layout/page-transition";

/** The rest of the site as a typographic index. Every row is a full-width link. */
export function PageIndex() {
  const pages = navigation.filter((item) => item.href !== "/");

  return (
    <section aria-labelledby="index-title" className="gutter pb-[clamp(6rem,16vh,12rem)]">
      <h2 id="index-title" className="display-condensed mb-10 text-headline text-ink">
        Explore
      </h2>
      <ul className="border-t border-line">
        {pages.map((item) => (
          <li key={item.href} className="border-b border-line">
            <TransitionLink
              href={item.href}
              data-cursor="Open"
              className="group grid items-baseline gap-x-8 gap-y-2 py-6 transition-colors duration-300 hover:text-signal md:grid-cols-12 md:py-8"
            >
              <span className="display-condensed text-[clamp(2.4rem,6.4vw,6.5rem)] leading-[0.95] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3 md:col-span-7">
                {item.title}
              </span>
              <span className="text-ink-soft transition-colors group-hover:text-ink md:col-span-4">
                {item.description}
              </span>
              <ArrowUpRight
                className="hidden size-7 justify-self-end text-ink-soft transition-[transform,color] duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal md:block"
                aria-hidden="true"
              />
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
