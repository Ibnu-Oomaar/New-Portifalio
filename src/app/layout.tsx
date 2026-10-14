import type { Metadata, Viewport } from "next";

import "./globals.css";
import { bricolage, instrument } from "./fonts";
import { site } from "@/content/site";
import { isConfiguredUrl } from "@/lib/utils";
import { PageTransitionProvider } from "@/components/layout/page-transition";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Cursor } from "@/components/layout/cursor";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}, ${site.title}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    site.name,
    site.title,
    "MERN Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.title}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const sameAs = [site.socials.github, site.socials.linkedin].filter(isConfiguredUrl);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description: site.statement,
  url: site.url,
  ...(sameAs.length ? { sameAs } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-200 -translate-y-24 rounded-full bg-signal px-5 py-3 font-medium text-signal-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <TooltipProvider>
          <PageTransitionProvider>
            <SmoothScrollProvider>
              <SiteHeader />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <SiteFooter />
            </SmoothScrollProvider>
          </PageTransitionProvider>
        </TooltipProvider>
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
