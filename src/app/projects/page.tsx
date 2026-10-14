import type { Metadata } from "next";

import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { visibleItems } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/shared/page-intro";
import { ProjectList } from "@/components/sections/project-list";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata: Metadata = createMetadata({
  title: "Selected Projects",
  description: `Selected projects and case studies by ${site.name}, ${site.title}.`,
  path: "/projects",
});

export default function ProjectsPage() {
  const list = visibleItems(projects);

  return (
    <>
      <div className="page-frame gutter pb-[clamp(5rem,14vh,10rem)]">
        <PageIntro
          title="Selected projects"
          lede="Software and systems, written up as case studies: the brief, the decisions and how it was built."
          className="mb-[clamp(4rem,10vh,8rem)]"
        />
        <ProjectList projects={list} />
      </div>

      <ClosingCta title="Want to add your project to this list?" href="/contact" cta="Contact Me" />
    </>
  );
}
