import type { TimelineEntry } from "./types";

/**
 * Professional work experience and education.
 * Based on the information provided by ABDIRIZAK MOKTAR.
 * Entries are ordered newest first.
 */

export const experience: TimelineEntry[] = [
  {
    id: "freelance-fullstack-developer",
    title: "Freelance Full-Stack Developer",
    organisation: "Independent / Freelance",
    period: "2025 - 2026",  
    summary:
      "Working independently on full-stack development projects, building modern web applications, developing backend APIs, managing databases, and delivering complete software solutions using modern JavaScript and TypeScript technologies.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "JWT",
      "Drizzle",
      "Neon",
      "REDIS",
      "Others...",
      
    ],
  },
  {
    id: "softmaal-fullstack-developer",
    title: "Full-Stack Developer",
    organisation: "Softmaal Solution",
    period: "2023 - 2024",
    summary:
      "Worked on full-stack software development, contributing to web application development, frontend interfaces, backend functionality, and database integration while gaining practical experience in building software solutions.",
    tags: [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Web Development",
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    id: "tiigsi-introductory-fullstack",
    title: "Introductory Full-Stack Development",
    organisation: "Tiigsi Technology Academy",
    period: "2025 - 2026",
    summary:
      "Studied the fundamentals of full-stack web development, building knowledge of frontend technologies, backend development, databases, and the core principles of modern web application engineering.",
  },
];