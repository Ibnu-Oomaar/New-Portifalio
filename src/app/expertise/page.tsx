import type { Metadata } from "next";

import { stackLayers } from "@/content/expertise";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/shared/page-intro";
import { ExpertiseExplorer } from "@/components/sections/expertise-explorer";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = createMetadata({
  title: "Expertise & Tech Stack",
  description: `The tech stack of ${site.name}, ${site.title}: MongoDB, Express, React and Node.js, plus the tools behind this portfolio.`,
  path: "/expertise",
});

export default function ExpertisePage() {
  return (
    <>
      <div className="page-frame gutter pb-[clamp(3rem,8vh,6rem)]">
        <PageIntro
          title="Expertise & tech stack"
          lede="A product is a stack of layers. Scroll through them to see what lives on each one and the tools I use there."
        />
      </div>

      <ExpertiseExplorer layers={stackLayers} />
      <ClosingCta title="Need a stack that fits your product?" href="/contact" cta="Contact Me" />
    </>
  );
}
