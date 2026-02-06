"use client"

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { Project } from "contentlayer/generated"

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = React.useState("All")
  
  const categories = ["All", "AI/ML", "Full Stack", "Automation"]
  
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "All") return projects
    return projects.filter(project => project.category === activeFilter)
  }, [activeFilter, projects])

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-primary">02</span>
            <h2 className="text-3xl md:text-4xl font-bold">What I&apos;ve Built</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Featured projects showcasing my work in AI, automation, and full-stack development.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Projects - Full width or 2-col */}
        {featuredProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-6xl mx-auto">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} featured />
            ))}
          </div>
        )}

        {/* Regular Projects - 3-col grid */}
        {regularProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {regularProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      {project.image && (
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {featured && (
            <Badge variant="default" className="shrink-0">Featured</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 text-sm">
            {project.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2 shrink-0">▹</span>
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="hover:bg-primary/20 hover:scale-105 transition-all cursor-default"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {project.liveUrl && (
          <Button asChild variant="default" className="flex-1">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline" className={project.liveUrl ? "flex-1" : "w-full"}>
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
