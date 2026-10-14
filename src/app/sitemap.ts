import type { MetadataRoute } from "next";

import { navigation } from "@/content/navigation";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = navigation.map((item) => ({
    url: `${base}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const caseStudies = projects
    .filter((project) => site.showPlaceholders || !project.placeholder)
    .map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  return [...pages, ...caseStudies];
}
