import type { Metadata } from "next";

import { about } from "@/content/about";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/shared/page-intro";
import { Monogram } from "@/components/shared/monogram";
import { SocialLinks } from "@/components/shared/social-links";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = createMetadata({
  title: "About Me",
  description: `About ${site.name}, ${site.title}. ${site.statement}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <div className="page-frame gutter pb-[clamp(5rem,14vh,10rem)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left: portrait and quick facts stay in view while the story scrolls */}
          <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Monogram portrait={about.portrait} alt={about.portraitAlt} />
            <dl className="grid gap-5 border-t border-line pt-6">
              {about.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="text-ink-soft">{fact.label}</dt>
                  <dd className="text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <SocialLinks />
          </aside>

          {/* Right: the story */}
          <div className="flex flex-col gap-16 lg:col-span-7 lg:col-start-6">
            <PageIntro title="About me" lede={about.headline} />

            <div className="flex flex-col gap-7">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[34em] text-lede text-ink">
                  {paragraph}
                </p>
              ))}
            </div>

            <section aria-labelledby="principles-title">
              <h2 id="principles-title" className="display-condensed text-headline text-ink">
                How I work
              </h2>
              <ul className="mt-8 border-t border-line">
                {about.principles.map((principle) => (
                  <li
                    key={principle.title}
                    className="grid gap-3 border-b border-line py-7 md:grid-cols-[1fr_1.3fr] md:gap-10"
                  >
                    <h3 className="display-condensed text-title text-ink">{principle.title}</h3>
                    <p className="text-ink-soft">{principle.body}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <ClosingCta title="See what this looks like in practice." href="/projects" cta="View My Work" />
    </>
  );
}
