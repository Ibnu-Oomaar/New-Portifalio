import type { Metadata } from "next";

import { site } from "@/content/site";
import { stackLayers } from "@/content/expertise";
import { projects } from "@/content/projects";
import { HomeHero } from "@/components/sections/home-hero";
import { Marquee } from "@/components/motion/marquee";
import { ScrubText } from "@/components/motion/scrub-text";
import { FeaturedProject } from "@/components/sections/featured-project";
import { PageIndex } from "@/components/sections/page-index";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | ${site.title}` },
  alternates: { canonical: "/" },
};

const marqueeTools = stackLayers
  .flatMap((layer) => layer.tools)
  .filter((tool) => tool.source !== "tooling")
  .sort((a, b) => Number(b.source === "core") - Number(a.source === "core"))
  .map((tool) => tool.name);

export default function HomePage() {
  const featured = projects[0];

  return (
    <>
      <HomeHero />

      <section aria-label="Technologies" className="border-y border-line py-7">
        <Marquee items={marqueeTools} />
      </section>

      <section aria-label="Statement" className="gutter py-[clamp(7rem,20vh,14rem)]">
        <ScrubText
          className="max-w-[18ch] font-serif text-[clamp(2.4rem,6.2vw,6.6rem)] leading-[1.02] text-ink sm:max-w-[22ch] lg:max-w-[26ch]"
          text="I build full-stack products where the interface, the server and the data are designed together. Code is the material, creativity is the method, and technology is the reason."
        />
      </section>

      {featured ? <FeaturedProject project={featured} /> : null}
      <PageIndex />
      <ClosingCta title="Have a product to build? Let's talk." href="/contact" cta="Contact Me" />
    </>
  );
}
