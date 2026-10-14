import { ArrowUp } from "lucide-react";

import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { isConfiguredUrl } from "@/lib/utils";
import { CurrentYear } from "@/components/shared/current-year";
import { DownloadCvButton } from "@/components/shared/download-cv-button";
import { SocialLinks } from "@/components/shared/social-links";
import { TransitionLink } from "@/components/layout/page-transition";
import { BackToTop } from "@/components/layout/back-to-top";

export function SiteFooter() {
  return (
    <footer className="gutter relative overflow-hidden border-t border-line bg-night-2 pb-8 pt-24">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="max-w-xl font-serif text-headline italic text-ink">{site.statement}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <DownloadCvButton size="default" />
            <SocialLinks />
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 lg:col-span-4 lg:col-start-8">
          {navigation.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className="group inline-flex w-fit items-center gap-2 text-lg text-ink-soft transition-colors hover:text-signal"
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>
      </div>

      <div className="mt-24">
        <p className="display-condensed select-none text-[clamp(3.2rem,12.4vw,16rem)] leading-[0.82] text-ink">
          {site.name}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; <CurrentYear /> {site.name}. {site.title}.
        </p>
        <div className="flex items-center gap-6">
          {isConfiguredUrl(site.contact.email) ? (
            <a href={`mailto:${site.contact.email}`} className="prose-link text-ink">
              {site.contact.email}
            </a>
          ) : null}
          <BackToTop>
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </BackToTop>
        </div>
      </div>
    </footer>
  );
}
