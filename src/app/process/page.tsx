import type { Metadata } from "next";

import { processStages } from "@/content/process";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/shared/page-intro";
import { ProcessTrack } from "@/components/sections/process-track";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = createMetadata({
  title: "Development Process",
  description: `How ${site.name}, ${site.title}, takes a product from idea to release: understand, design, build, verify, ship and improve.`,
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <div className="page-frame gutter pb-[clamp(4rem,10vh,8rem)]">
        <PageIntro
          title="Development process"
          lede="Six stages from a loose idea to a released product. Keep scrolling and the stages move sideways."
        />
      </div>

      <ProcessTrack stages={processStages} />
      <ClosingCta title="Ready to start the first stage?" href="/contact" cta="Contact Me" />
    </>
  );
}
