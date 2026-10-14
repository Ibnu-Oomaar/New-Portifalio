import type { Metadata } from "next";

import { site } from "@/content/site";

interface PageMetadataInput {
  /** Page title without the brand suffix, e.g. "About Me". */
  title: string;
  description: string;
  /** Route path, e.g. "/about". */
  path: string;
}

/** Consistent per-page metadata: name and title are always ABDIRIZAK MOKTAR, FULL-STACK DEVELOPER. */
export function createMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}, ${site.title}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}, ${site.title}`,
      description,
    },
  };
}
