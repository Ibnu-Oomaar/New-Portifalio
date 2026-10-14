import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { TransitionLink } from "@/components/layout/page-transition";
import { ProjectCover } from "@/components/shared/project-cover";

/** One project shown large on the home page. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <section aria-labelledby="featured-title" className="gutter pb-[clamp(6rem,16vh,12rem)]">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6">
        <h2 id="featured-title" className="display-condensed text-headline text-ink">
          Selected work
        </h2>
        <TransitionLink
          href="/projects"
          className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-signal"
        >
          All projects
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </TransitionLink>
      </div>

      <div className="grid items-end gap-10 lg:grid-cols-12">
        <TransitionLink
          href={`/projects/${project.slug}`}
          className="group relative block overflow-hidden border border-line lg:col-span-8"
          data-cursor="View"
          aria-label={`Read the case study: ${project.title}`}
        >
          <div className="aspect-[16/10] overflow-hidden">
            <ProjectCover
              seed={project.coverSeed}
              className="transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
            />
          </div>
        </TransitionLink>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <p className="text-sm text-ink-soft">{project.year}</p>
          <h3 className="display-condensed text-[clamp(2.2rem,4.4vw,4.6rem)] leading-[0.92] text-ink">
            {project.title}
          </h3>
          <p className="font-serif text-2xl italic leading-snug text-ink-soft">{project.tagline}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.stack.slice(0, 5).map((tool) => (
              <li key={tool}>
                <Badge variant="muted">{tool}</Badge>
              </li>
            ))}
          </ul>
          <TransitionLink
            href={`/projects/${project.slug}`}
            className="prose-link w-fit text-lg text-ink"
          >
            Read the case study
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
