import type { Project } from "contentlayer/generated";
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card project-card-${index}`}>
      <div className="project-card-top">
        <span className="project-glyph" aria-hidden="true">
          {["{ }", "↗", "⌘"][index % 3]}
        </span>
        <span className="eyebrow">
          {project.featured ? "FEATURED" : project.category}
        </span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech mono">
        {project.technologies.slice(0, 3).join(" / ")}
      </div>
      <div className="project-links">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            source ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            live ↗
          </a>
        )}
      </div>
    </article>
  );
}
export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const others = projects.filter((project) => project._id !== featured?._id);
  const fan = [
    others[0],
    featured,
    others
      .slice(1)
      .find((project) => project.category === "Full-stack & mobile") ??
      others[1],
  ].filter(Boolean);
  return (
    <section id="projects" className="portfolio-section">
      <div className="section-heading">
        <h2>02 — projects</h2>
        <a href="#all-projects">ALL →</a>
      </div>
      <div className="project-fan">
        {fan.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
      <details id="all-projects" className="all-projects">
        <summary>
          Explore all {projects.length} projects <span>↓</span>
        </summary>
        <div className="project-list">
          {projects.map((project) => (
            <article key={project._id}>
              <div className="project-list-heading">
                <h3>{project.title}</h3>
                <span className="mono muted">{project.date}</span>
              </div>
              <p>{project.description}</p>
              {project.highlights && (
                <ul>
                  {project.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              <div className="stack-chips">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    source ↗
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    live ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
