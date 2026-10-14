import type { StackLayer } from "./types";

/**
 * Complete technology stack of ABDIRIZAK MOKTAR.
 * Grouped into four product engineering layers.
 *
 * source:
 * core      → Primary development technologies
 * portfolio → Technologies used in projects and portfolio
 * tooling   → Development, deployment and productivity tools
 */

export const stackLayers: StackLayer[] = [
  {
    id: "interface",
    name: "Frontend & Interface",
    summary:
      "Building modern, responsive and interactive user experiences through component-based architecture, styling systems, state management and animation.",
    tools: [
      { name: "HTML5", source: "core" },
      { name: "CSS3", source: "core" },
      { name: "JavaScript", source: "core" },
      { name: "TypeScript", source: "core" },
      { name: "React", source: "core" },
      { name: "Next.js", source: "core" },
      { name: "Tailwind CSS", source: "core" },
      { name: "shadcn/ui", source: "portfolio" },
      { name: "GSAP", source: "portfolio" },
      { name: "Framer Motion", source: "portfolio" },
      { name: "Three.js", source: "portfolio" },
      { name: "TanStack Query", source: "portfolio" },
      { name: "Zustand", source: "portfolio" },
      { name: "React Hook Form", source: "portfolio" },
    ],
  },
  {
    id: "server",
    name: "Backend & Security",
    summary:
      "Engineering secure and scalable server-side applications, REST APIs, authentication systems, business logic and real-time communication.",
    tools: [
      { name: "Node.js", source: "core" },
      { name: "Express.js", source: "core" },
      { name: "NestJS", source: "core" },
      { name: "REST APIs", source: "core" },
      { name: "JWT", source: "core" },
      { name: "Argon2", source: "portfolio" },
      { name: "bcrypt", source: "portfolio" },
      { name: "Google OAuth", source: "portfolio" },
      { name: "Redis", source: "portfolio" },
      { name: "Socket.IO", source: "portfolio" },
      { name: "Winston", source: "tooling" },
    ],
  },
  {
    id: "data",
    name: "Database & ORM",
    summary:
      "Designing reliable data models, managing relational and NoSQL databases, and connecting applications to efficient data access layers.",
    tools: [
      { name: "MongoDB", source: "core" },
      { name: "PostgreSQL", source: "core" },
      { name: "SQL", source: "core" },
      { name: "Supabase", source: "portfolio" },
      { name: "Neon", source: "portfolio" },
      { name: "Prisma ORM", source: "portfolio" },
      { name: "Drizzle ORM", source: "portfolio" },
    ],
  },
  {
    id: "tooling",
    name: "Cloud, DevOps & Developer Tools",
    summary:
      "Managing development workflows, code quality, API documentation, cloud deployment, collaboration and production delivery.",
    tools: [
      { name: "Git", source: "tooling" },
      { name: "GitHub", source: "tooling" },
      { name: "AWS", source: "tooling" },
      { name: "Vercel", source: "tooling" },
      { name: "Cloudinary", source: "tooling" },
      { name: "Stripe", source: "portfolio" },
      { name: "Zod", source: "tooling" },
      { name: "Swagger", source: "tooling" },
      { name: "ESLint", source: "tooling" },
      { name: "Prettier", source: "tooling" },
      { name: "VS Code", source: "tooling" },
      { name: "Cursor", source: "tooling" },
      { name: "Antigravity", source: "tooling" },
    ],
  },
];

export const sourceLabels = {
  core: "Core Technologies",
  portfolio: "Project Technologies",
  tooling: "Development Tools",
} as const;