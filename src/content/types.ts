/**
 * Shared content types.
 *
 * Anything flagged `placeholder: true` is sample structure for information that has not been
 * provided yet. Replace the values, delete the flag, and the placeholder styling disappears.
 * Run `npm run content:check` to list every placeholder that is still in the content files.
 */

export interface Placeholderable {
  /** Marks sample content that must be replaced with real information. */
  placeholder?: boolean;
}

export interface NavItem {
  /** Short label used in menus. */
  label: string;
  /** Full section title used on the page and in metadata. */
  title: string;
  href: string;
  /** One sentence shown in the menu and on the home index. */
  description: string;
}

export type SkillSource = "core" | "portfolio" | "tooling";

export interface Tool {
  name: string;
  /** core = MERN stack, portfolio = used to build this site, tooling = day-to-day tooling. */
  source: SkillSource;
}

export interface StackLayer {
  id: string;
  name: string;
  summary: string;
  tools: Tool[];
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface Project extends Placeholderable {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  /** Only real, working URLs. Leave undefined until the link exists. */
  links: { live?: string; repository?: string };
  sections: ProjectSection[];
  /** Short factual statements shown beside the case study. */
  facts: { label: string; value: string }[];
  /** Seed for the generated cover artwork. */
  coverSeed: number;
  /** Optional static cover image used instead of the generated artwork. */
  coverImage?: string;
}

export interface TimelineEntry extends Placeholderable {
  id: string;
  title: string;
  organisation: string;
  period: string;
  summary: string;
  tags?: string[];
}

export interface RecognitionEntry extends Placeholderable {
  id: string;
  title: string;
  issuer: string;
  year: string;
  summary: string;
  /** Optional verifiable URL (credential, certificate, announcement). */
  url?: string;
}

export interface ProcessStage {
  id: string;
  name: string;
  summary: string;
  actions: string[];
  deliverable: string;
}
