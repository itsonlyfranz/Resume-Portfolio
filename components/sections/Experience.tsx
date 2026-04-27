"use client"

import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      company: "THEOSYM",
      position: "AI Engineer / Backend Developer",
      period: "Nov 2024 - January 2026",
      description: "Designing and optimizing scalable backend systems and APIs supporting AI-driven applications.",
      impact: [
        "Designed scalable backend systems supporting AI-driven, full-stack applications",
        "Developed LLM-based AI agents using prompt engineering and structured context management",
        "Built AI automation pipelines using n8n, reducing manual processes and improving efficiency"
      ],
      responsibilities: [
        "Implement AI integrations using Model Context Protocol (MCP) for consistent LLM context handling",
        "Integrate AI-powered services into production systems through RESTful APIs",
        "Build full-stack features with Next.js and React, using Supabase for auth and database management"
      ],
      technologies: ["Python", "Node.js", "TypeScript", "Next.js", "React", "n8n", "Supabase", "MCP", "LLM Agents"]
    }
  ]

  return (
    <section id="experience" className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" />
        <h2 className="resume-heading">Experience</h2>
      </div>

      <div className="space-y-5">
        {experiences.map((exp) => (
          <div key={`${exp.company}-${exp.position}`} className="border-l border-border pl-4">
            <div className="relative">
              <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
              <h3 className="text-sm font-semibold leading-5">{exp.position}</h3>
              <div className="mt-1 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{exp.company}</span>
                <span className="text-right">{exp.period}</span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{exp.description}</p>
            <ul className="mt-3 space-y-1.5 text-xs leading-5">
              {exp.impact.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.technologies.slice(0, 8).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-[10px]">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
