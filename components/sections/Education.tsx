"use client"

import { GraduationCap } from "lucide-react"

export function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "University of the Cordilleras",
      period: "2022 - 2026",
      description: "Major in Network and Security. Focused on backend development, AI integration, and system architecture.",
      highlights: [
        "Specialized in Network and Security",
        "Hands-on experience with AI and automation technologies",
        "Strong foundation in backend systems and API development"
      ]
    }
  ]

  return (
    <section id="education" className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <GraduationCap className="h-4 w-4 text-primary" />
        <h2 className="resume-heading">Education</h2>
      </div>

      {education.map((edu) => (
        <div key={edu.degree} className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold leading-5">{edu.degree}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{edu.institution}</p>
            <p className="mt-1 text-xs text-muted-foreground">{edu.period}</p>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">{edu.description}</p>
          <ul className="space-y-1.5 text-xs leading-5">
            {edu.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="text-primary">▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
