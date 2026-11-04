"use client"

import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      company: "ShiftCare",
      position: "AI Engineer",
      location: "New South Wales, Australia (remote)",
      period: "May 2026 - Present",
      description: "Build full-stack AI agents, covering the LLM agent logic, backend services and the application layer around them.",
      impact: [],
      technologies: []
    },
    {
      company: "Stealth-Mode Startup",
      position: "AI Engineer",
      location: "Company undisclosed at the employer's request",
      period: "January 2026 - May 2026",
      description: "Worked as an AI Engineer on an early-stage, confidential product.",
      impact: [],
      technologies: []
    },
    {
      company: "THEOSYM",
      position: "AI Engineer",
      location: "California, United States (remote)",
      period: "November 2024 - January 2026",
      description: "Developed AI-powered full-stack applications and backend systems with LLM integrations and workflow automation.",
      impact: [
        "Built and deployed AI-driven applications, backend APIs and LLM-based solutions for production use."
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
              <p className="mt-1 text-xs text-muted-foreground">{exp.location}</p>
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
