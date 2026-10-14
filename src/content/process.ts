import type { ProcessStage } from "./types";

/**
 * The development process shown on /process. This is a sequence, so the stages are numbered.
 * Adjust the wording so it matches how you really work.
 */
export const processStages: ProcessStage[] = [
  {
    id: "understand",
    name: "Understand",
    summary:
      "Start with the problem, not the stack. Who is it for, what must it do, and how will we know it works?",
    actions: [
      "Clarify the goal, the users and the constraints",
      "List what is in scope and what is not",
      "Surface the risky questions early",
    ],
    deliverable: "A short written scope and a list of open questions.",
  },
  {
    id: "design",
    name: "Design",
    summary:
      "Give the product a structure before it gets a surface: data, routes, then interface.",
    actions: [
      "Model the data and the relationships between it",
      "Map routes, API endpoints and page structure",
      "Set the visual direction and the design tokens",
    ],
    deliverable: "A data model, a route map and an interface direction.",
  },
  {
    id: "build",
    name: "Build",
    summary:
      "Work in vertical slices, from database to screen, so each feature works end to end early.",
    actions: [
      "Ship thin, complete slices rather than half-built layers",
      "Keep code typed, readable and reusable",
      "Review each change before it lands",
    ],
    deliverable: "Working features, delivered in small steps that are easy to review.",
  },
  {
    id: "verify",
    name: "Verify",
    summary:
      "Prove it works: type checks, linting and the real user flows, starting on small screens.",
    actions: [
      "Run type checks, linting and a production build",
      "Exercise the real flows by hand, keyboard included",
      "Check behaviour on small screens and with reduced motion",
    ],
    deliverable: "A build that passes its checks and has been used, not just compiled.",
  },
  {
    id: "ship",
    name: "Ship",
    summary:
      "Release with configuration in the environment, setup written down and nothing left to guesswork.",
    actions: [
      "Keep secrets and settings in environment variables",
      "Document how to run, build and deploy",
      "Release in a way that is easy to roll back",
    ],
    deliverable: "A deployed product and the notes to run it.",
  },
  {
    id: "improve",
    name: "Improve",
    summary:
      "Launch is the start of the feedback loop. Watch how it is used and refine what matters.",
    actions: [
      "Collect feedback and look at how the product is really used",
      "Fix what hurts first, then refine",
      "Keep the codebase healthy as it grows",
    ],
    deliverable: "A short list of next improvements, ordered by value.",
  },
];
