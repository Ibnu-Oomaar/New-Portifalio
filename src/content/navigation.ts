import type { NavItem } from "./types";

/** The eight main sections, each with its own dedicated page. */
export const navigation: NavItem[] = [
  {
    label: "Home",
    title: "Home",
    href: "/",
    description: "The front door: who I am and what I build.",
  },
  {
    label: "About",
    title: "About Me",
    href: "/about",
    description: "The developer behind the work and how I think.",
  },
  {
    label: "Expertise",
    title: "Expertise & Tech Stack",
    href: "/expertise",
    description: "The layers of a product and the tools I use on each.",
  },
  {
    label: "Projects",
    title: "Selected Projects",
    href: "/projects",
    description: "Case studies of software and systems I have built.",
  },
  {
    label: "Experience",
    title: "Experience & Education",
    href: "/experience",
    description: "Where I have worked and what I have studied.",
  },
  {
    label: "Process",
    title: "Development Process",
    href: "/process",
    description: "How an idea becomes a shipped product.",
  },
  {
    label: "Certifications",
    title: "Certifications & Achievements",
    href: "/certifications",
    description: "Credentials and milestones worth recording.",
  },
  {
    label: "Contact",
    title: "Contact",
    href: "/contact",
    description: "Start a conversation about your next project.",
  },
];

export function getNavItem(href: string): NavItem | undefined {
  return navigation.find((item) => item.href === href);
}

/** The page after the given one, wrapping around, used for "next page" links. */
export function getNextNavItem(href: string): NavItem {
  const index = navigation.findIndex((item) => item.href === href);
  return navigation[(index + 1 + navigation.length) % navigation.length] ?? navigation[0];
}
