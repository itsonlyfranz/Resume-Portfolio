import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { allProjects, type Project } from "contentlayer/generated";
import {
  Chip,
  ExternalLinks,
  Monogram,
  PageShell,
  Pill,
} from "@/components/primitives";
import { monogram } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "LLM agents, RAG systems and full-stack apps built by Señor Roberto Francisco Pablo.",
  alternates: { canonical: "/projects" },
};

function Highlights({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[13.5px] leading-relaxed text-gray-600 marker:text-gray-300">
      {items.slice(0, 3).map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </ul>
  );
}

function Technologies({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((tech) => (
        <li key={tech}>
          <Chip size="xs">{tech}</Chip>
        </li>
      ))}
    </ul>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="reveal soft-shadow rounded-2xl bg-gradient-to-br from-gray-50 to-paper p-6 sm:p-7">
      <div className="flex items-start gap-4 sm:gap-5">
        <Monogram value={monogram(project.title)} size="lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <Pill solid>Featured</Pill>
            {project.category && <Pill>{project.category}</Pill>}
            <Pill>{project.date}</Pill>
          </div>
          <h2 className="mt-3 font-pixel text-xl leading-tight">
            {project.title}
          </h2>
          <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-gray-600">
            {project.description}
          </p>
        </div>
      </div>
      <Highlights items={project.highlights} />
      <Technologies items={project.technologies} />
      <div className="edge-fade-divider mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
          Links
        </span>
        <ExternalLinks
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
        />
      </div>
    </article>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const href = project.liveUrl || project.githubUrl;
  return (
    <article className="reveal group flex flex-col gap-4 bg-paper p-6 hover:bg-gray-50 sm:flex-row sm:gap-6 sm:p-7">
      <div className="shrink-0 sm:w-52">
        <h2 className="font-pixel text-base leading-snug text-ink">
          {project.title}
        </h2>
        <p className="mt-1 font-mono text-[11px] text-gray-400">
          {project.date}
        </p>
      </div>
      <div className="min-w-0 flex-1">
        <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
          {project.category ?? "Project"}
        </span>
        <p className="mt-1.5 text-[14px] leading-relaxed text-gray-600">
          {project.description}
        </p>
        {project.highlights?.length ? (
          <details className="group/details mt-3">
            <summary className="w-fit cursor-pointer list-none font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-ink [&::-webkit-details-marker]:hidden">
              <span className="group-open/details:hidden">+ highlights</span>
              <span className="hidden group-open/details:inline">
                − highlights
              </span>
            </summary>
            <Highlights items={project.highlights} />
          </details>
        ) : null}
        <Technologies items={project.technologies} />
        <ExternalLinks
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          className="mt-4"
        />
      </div>
      {href && (
        <ArrowUpRight
          aria-hidden="true"
          className="hidden h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block"
        />
      )}
    </article>
  );
}

export default function ProjectsPage() {
  const projects = [...allProjects].sort((a, b) => a.order - b.order);
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);
  return (
    <PageShell
      title="projects"
      lede="LLM agents, RAG systems and full-stack apps — each one with its source on GitHub."
    >
      <div className="mb-10 space-y-4">
        {featured.map((project) => (
          <FeaturedCard key={project._id} project={project} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="project-stack overflow-hidden rounded-2xl border border-gray-200">
          {rest.map((project) => (
            <ProjectRow key={project._id} project={project} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
