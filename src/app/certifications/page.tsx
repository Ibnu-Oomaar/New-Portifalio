import type { Metadata } from "next";

import { achievements, certifications } from "@/content/certifications";
import { site } from "@/content/site";
import { visibleItems } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/shared/page-intro";
import { RecognitionList } from "@/components/sections/recognition-list";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = createMetadata({
  title: "Certifications & Achievements",
  description: `Certifications and achievements of ${site.name}, ${site.title}.`,
  path: "/certifications",
});

export default function CertificationsPage() {
  const certs = visibleItems(certifications);
  const wins = visibleItems(achievements);

  return (
    <>
      <div className="page-frame gutter pb-[clamp(5rem,14vh,10rem)]">
        <PageIntro
          title="Certifications & achievements"
          lede="Credentials and milestones, listed only when they can be backed up."
          className="mb-[clamp(4rem,10vh,8rem)]"
        />

        <div className="grid gap-[clamp(4rem,10vh,8rem)]">
          <section aria-labelledby="certs-title">
            <h2 id="certs-title" className="display-condensed mb-8 text-headline text-ink">
              Certifications
            </h2>
            <RecognitionList
              entries={certs}
              source="src/content/certifications.ts"
              emptyMessage="Certifications will appear here once they are added in src/content/certifications.ts."
            />
          </section>

          <section aria-labelledby="wins-title">
            <h2 id="wins-title" className="display-condensed mb-8 text-headline text-ink">
              Achievements
            </h2>
            <RecognitionList
              entries={wins}
              source="src/content/certifications.ts"
              emptyMessage="Achievements will appear here once they are added in src/content/certifications.ts."
            />
          </section>
        </div>
      </div>

      <ClosingCta title="Let the work speak next." href="/projects" cta="View My Work" />
    </>
  );
}
