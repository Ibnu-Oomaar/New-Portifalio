import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { visibleItems } from "@/lib/content";
import { isConfiguredUrl } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { TransitionLink } from "@/components/layout/page-transition";
import { ProjectCover } from "@/components/shared/project-cover";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";

export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: `${project.summary} Case study by ${site.name}, ${site.title}.`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || (project.placeholder && !site.showPlaceholders)) notFound();

  const list = visibleItems(projects);
  const index = list.findIndex((item) => item.slug === project.slug);
  const next = list[(index + 1) % list.length];
  const hasLinks = isConfiguredUrl(project.links.live) || isConfiguredUrl(project.links.repository);

  return (
    <article>
      <header className="page-frame gutter">
        <TransitionLink
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-signal"
        >
          <ArrowUpRight className="size-4 -scale-x-100" aria-hidden="true" />
          All projects
        </TransitionLink>

        <h1 className="display-condensed text-display text-ink">
          <SplitReveal text={project.title.toUpperCase()} stagger={0.03} />
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <p className="font-serif text-[clamp(1.6rem,3vw,2.8rem)] italic leading-[1.1] text-ink lg:col-span-7">
            {project.tagline}
          </p>
          <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
            {project.placeholder ? <PlaceholderBadge file="src/content/projects.ts" /> : null}
            {isConfiguredUrl(project.links.live) ? (
              <Button asChild>
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  Visit live site
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            ) : null}
            {isConfiguredUrl(project.links.repository) ? (
              <Button asChild variant="outline">
                <a href={project.links.repository} target="_blank" rel="noopener noreferrer">
                  View source code
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            ) : null}
            {!hasLinks ? (
              <p className="text-sm text-ink-soft">No public links for this project yet.</p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="gutter mt-[clamp(3rem,8vh,6rem)]">
        <div className="aspect-16/8 overflow-hidden border border-line">
          <ProjectCover seed={project.coverSeed} placeholder={project.placeholder} imageSrc={project.coverImage} />
        </div>
      </div>

      <div className="gutter mt-[clamp(4rem,10vh,8rem)] grid gap-14 lg:grid-cols-12">
        <aside className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
          <dl className="grid gap-6 border-t border-line pt-6">
            <div>
              <dt className="text-sm text-ink-soft">Year</dt>
              <dd className="text-lg text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">Role</dt>
              <dd className="text-lg text-ink">{project.role}</dd>
            </div>
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-ink-soft">{fact.label}</dt>
                <dd className="text-lg text-ink">{fact.value}</dd>
              </div>
            ))}
            <div>
              <dt className="mb-3 text-sm text-ink-soft">Built with</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tool) => (
                    <li key={tool}>
                      <Badge variant="muted">{tool}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>

        <div className="flex flex-col gap-[clamp(3.5rem,8vh,6rem)] lg:col-span-8 lg:col-start-5">
          <p className="max-w-[34em] text-lede text-ink">{project.summary}</p>
          {project.sections.map((section) => (
            <section key={section.heading} aria-labelledby={`section-${section.heading}`}>
              <h2
                id={`section-${section.heading}`}
                className="display-condensed text-headline mb-6 text-ink"
              >
                {section.heading}
              </h2>
              <div className="flex max-w-[36em] flex-col gap-5 text-lg text-ink-soft">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {next && next.slug !== project.slug ? (
        <section className="gutter py-[clamp(6rem,16vh,12rem)]" aria-label="Next project">
          <TransitionLink
            href={`/projects/${next.slug}`}
            data-cursor="Next"
            className="group flex flex-col gap-4 border-t border-line pt-10"
          >
            <span className="text-ink-soft">Next project</span>
            <span className="display-condensed text-display text-ink transition-colors duration-300 group-hover:text-signal">
              {next.title}
            </span>
          </TransitionLink>
        </section>
      ) : (
        <div className="h-[clamp(4rem,10vh,8rem)]" />
      )}
    </article>
  );
}
