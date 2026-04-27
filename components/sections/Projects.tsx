"use client"

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Project } from "contentlayer/generated"

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = React.useState("All")

  const categories = React.useMemo(() => {
    const projectCategories = projects
      .map((project) => project.category)
      .filter((category): category is string => Boolean(category))

    return ["All", ...Array.from(new Set(projectCategories))]
  }, [projects])
  
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "All") return projects
    return projects.filter(project => project.category === activeFilter)
  }, [activeFilter, projects])

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <section id="projects" className="resume-section">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="resume-heading">Recent Projects</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Selected AI, full-stack, mobile, and Web3 work.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className="h-8 text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {featuredProjects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} featured />
          ))}
        </div>
      )}

      {regularProjects.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {regularProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          No projects found in this category.
        </div>
      )}
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-colors hover:border-primary/40">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-5 transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          {featured && (
            <Badge variant="secondary" className="shrink-0 border-primary/20 text-[10px] text-primary">Featured</Badge>
          )}
        </div>
        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 p-4 pt-2">
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 text-xs leading-5">
            {project.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2 shrink-0">▹</span>
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 7).map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="cursor-default text-[10px]"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex gap-2 p-4 pt-0">
        {project.liveUrl && (
          <Button asChild variant="default" size="sm" className="h-8 flex-1 text-xs">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline" size="sm" className={project.liveUrl ? "h-8 flex-1 text-xs" : "h-8 w-full text-xs"}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
