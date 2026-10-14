import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/layout/page-transition";
import { ProjectCover } from "@/components/shared/project-cover";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";

/**
 * Projects as an asymmetric editorial list: covers alternate sides and sit at different widths,
 * so the page reads as a sequence of spreads rather than a grid of identical cards.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ol className="flex flex-col gap-[clamp(5rem,12vh,9rem)]">
      {projects.map((project, index) => {
        const flipped = index % 2 === 1;
        return (
          <li key={project.slug}>
            <article className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
              <TransitionLink
                href={`/projects/${project.slug}`}
                data-cursor="View"
                aria-label={`Read the case study: ${project.title}`}
                className={cn(
                  "group relative block overflow-hidden border border-line",
                  flipped ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-8",
                )}
              >
                <div className={cn("overflow-hidden", flipped ? "aspect-[4/3]" : "aspect-[16/10]")}>
                  <ProjectCover
                    seed={project.coverSeed}
                    placeholder={project.placeholder}
                    imageSrc={project.coverImage}
                    className="transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                  />
                </div>
              </TransitionLink>

              <div
                className={cn(
                  "flex flex-col gap-5",
                  flipped ? "lg:order-1 lg:col-span-5" : "lg:col-span-4",
                )}
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
                  <span>{project.year}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                  <span>{project.role}</span>
                  {project.placeholder ? <PlaceholderBadge file="src/content/projects.ts" /> : null}
                </div>

                <h2 className="display-condensed text-[clamp(2.4rem,4.8vw,5rem)] leading-[0.92] text-ink">
                  <TransitionLink
                    href={`/projects/${project.slug}`}
                    className="transition-colors hover:text-signal"
                  >
                    {project.title}
                  </TransitionLink>
                </h2>

                <p className="font-serif text-2xl italic leading-snug text-ink-soft">{project.tagline}</p>
                <p className="max-w-md text-ink-soft">{project.summary}</p>

                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {project.stack.slice(0, 6).map((tool) => (
                    <li key={tool}>
                      <Badge variant="muted">{tool}</Badge>
                    </li>
                  ))}
                </ul>

                <TransitionLink
                  href={`/projects/${project.slug}`}
                  className="group/link inline-flex w-fit items-center gap-2 text-lg text-ink transition-colors hover:text-signal"
                >
                  Read the case study
                  <ArrowUpRight
                    className="size-5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden="true"
                  />
                </TransitionLink>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
