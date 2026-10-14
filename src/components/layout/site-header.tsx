"use client";

import { usePathname } from "next/navigation";

import { getNavItem, navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { TransitionLink } from "@/components/layout/page-transition";
import { MenuOverlay } from "@/components/layout/menu-overlay";

function currentLabel(pathname: string) {
  const exact = getNavItem(pathname);
  if (exact) return exact.title;
  const section = navigation.find((item) => item.href !== "/" && pathname.startsWith(`${item.href}/`));
  return section?.title ?? "";
}

/** Fixed top bar: brand mark on the left, current section in the middle, menu on the right. */
export function SiteHeader() {
  const pathname = usePathname();
  const label = currentLabel(pathname);

  return (
    <header className="gutter pointer-events-none fixed inset-x-0 top-0 z-60 flex items-start justify-between bg-linear-to-b from-night/90 via-night/50 to-transparent pb-8 pt-5">
      <TransitionLink
        href="/"
        aria-label={`${site.name}. Home`}
        className="pointer-events-auto flex items-center"
      >
        <span className="display-condensed text-lg text-ink">Abdirizak Moktar</span>
      </TransitionLink>

      <p
        className="pointer-events-none mt-3 hidden items-center gap-2.5 text-sm text-ink-soft md:flex"
        aria-hidden="true"
      >
        <span className="size-1.5 rounded-full bg-signal" />
        {label}
      </p>

      <div className="pointer-events-auto">
        <MenuOverlay />
      </div>
    </header>
  );
}
