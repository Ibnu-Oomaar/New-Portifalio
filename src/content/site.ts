/**
 * Core identity and configuration for the portfolio.
 *
 * Brand rules (do not change without intent):
 *   name  → ABDIRIZAK MOKTAR
 *   title → FULL-STACK DEVELOPER
 *
 * Contact details and social profiles are read from environment variables so nothing is invented.
 * Copy `.env.example` to `.env.local` and fill in real values. Empty values hide the matching UI
 * or render it as clearly "not configured" instead of linking somewhere fake.
 */

export const site = {
  name: "ABDIRIZAK MOKTAR",
  title: "FULL-STACK DEVELOPER",
  identity: "Creative Full-Stack Developer",
  statement:
    "Building meaningful digital experiences through code, creativity, and technology.",
  /** Short second-person description used for metadata. */
  description:
    "Portfolio of ABDIRIZAK MOKTAR, FULL-STACK DEVELOPER. Building meaningful digital experiences through code, creativity, and technology.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  startYear: 2026,

  cv: {
    /** CV opened by the portfolio button. */
    href: "/cv/Abdirizak%27s%20Cv%20(1).pdf",
    fileName: "Abdirizak's Cv (1).pdf",
  },

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  },

  socials: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },

  /**
   * While `true`, sample entries (flagged `placeholder: true` in /src/content) are shown so the
   * layout is visible. Set to `false` to hide every placeholder until real content replaces it.
   */
  showPlaceholders: true,
} as const;

export type Site = typeof site;
