"use client";
import { useState } from "react";
import type { Project } from "contentlayer/generated";
import { ExternalLinks, Monogram, Pill, SectionHeading } from "../primitives";
import { monogram } from "@/lib/portfolio";

const POSITIONS = ["is-left", "is-center", "is-right"] as const;

/** Picks the three home-page cards: the featured project between two others. */
function pickDeck(projects: Project[]) {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const others = projects.filter((project) => project._id !== featured?._id);
  return [
    others[0],
    featured,
    others
      .slice(1)
      .find((project) => project.category === "Full-stack & mobile") ??
      others[1],
  ].filter(Boolean);
}

function DeckCard({
  project,
  position,
  onSelect,
}: {
  project: Project;
  position: (typeof POSITIONS)[number];
  onSelect: () => void;
}) {
  const centered = position === "is-center";
  return (
    <article
      className={`deck-card ${position} rounded-2xl border border-gray-200 bg-paper p-5`}
    >
      <div inert={!centered}>
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill solid>{project.category ?? "Project"}</Pill>
          {project.featured && <Pill>Featured</Pill>}
          <Pill>{project.date}</Pill>
        </div>
        <div className="mt-4 flex items-center gap-3.5">
          <Monogram value={monogram(project.title)} />
          <h3 className="font-pixel text-base leading-tight text-ink">
            {project.title}
          </h3>
        </div>
        <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-gray-600">
          {project.description}
        </p>
        <p className="mt-3 truncate font-mono text-[11px] text-gray-400">
          {project.technologies.slice(0, 3).join(" / ")}
        </p>
        <ExternalLinks
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          className="mt-4"
        />
      </div>
      {!centered && (
        <button
          type="button"
          onClick={onSelect}
          className="absolute inset-0 z-10 cursor-pointer rounded-2xl"
          aria-label={`Show ${project.title}`}
        />
      )}
    </article>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const deck = pickDeck(projects);
  // `offset` rotates which project sits in the centre slot.
  const [offset, setOffset] = useState(0);
  const count = deck.length;
  return (
    <section id="projects" className="py-14">
      <SectionHeading
        title="02 — projects"
        href="/projects"
        linkLabel={`all ${projects.length} projects →`}
      />
      <div className="deck">
        {deck.map((project, index) => {
          const slot = (((index - offset) % count) + count) % count;
          const position =
            POSITIONS[count === 3 ? slot : Math.min(slot + 1, 2)];
          return (
            <DeckCard
              key={project._id}
              project={project}
              position={position}
              onSelect={() =>
                setOffset((current) =>
                  position === "is-left"
                    ? (current + count - 1) % count
                    : (current + 1) % count,
                )
              }
            />
          );
        })}
      </div>
    </section>
  );
}
