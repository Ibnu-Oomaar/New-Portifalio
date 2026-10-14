import type { Metadata } from "next";

import { education, experience } from "@/content/experience";
import { site } from "@/content/site";
import { visibleItems } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/shared/page-intro";
import { Timeline } from "@/components/sections/timeline";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = createMetadata({
  title: "Experience & Education",
  description: `Work experience and education of ${site.name}, ${site.title}.`,
  path: "/experience",
});

export default function ExperiencePage() {
  const work = visibleItems(experience);
  const study = visibleItems(education);

  return (
    <>
      <div className="page-frame gutter pb-[clamp(5rem,14vh,10rem)]">
        <PageIntro
          title="Experience & education"
          lede="Where I have worked, and what I have studied."
          className="mb-[clamp(4rem,10vh,8rem)]"
        />

        <div className="grid gap-[clamp(4rem,10vh,8rem)]">
          <section aria-labelledby="work-title" className="grid gap-10 lg:grid-cols-12">
            <h2 id="work-title" className="display-condensed text-headline text-ink lg:col-span-4">
              Experience
            </h2>
            <div className="lg:col-span-8">
              <Timeline
                entries={work}
                source="src/content/experience.ts"
                emptyMessage="Experience will appear here once it is added in src/content/experience.ts."
              />
            </div>
          </section>

          <section aria-labelledby="study-title" className="grid gap-10 lg:grid-cols-12">
            <h2 id="study-title" className="display-condensed text-headline text-ink lg:col-span-4">
              Education
            </h2>
            <div className="lg:col-span-8">
              <Timeline
                entries={study}
                source="src/content/experience.ts"
                emptyMessage="Education will appear here once it is added in src/content/experience.ts."
              />
            </div>
          </section>
        </div>
      </div>

      <ClosingCta title="Curious how I work day to day?" href="/process" cta="See My Process" />
    </>
  );
}
