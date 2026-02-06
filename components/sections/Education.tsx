"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"

export function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "University of the Cordilleras",
      period: "2022 - 2025",
      description: "Major in Network and Security. Focused on backend development, AI integration, and system architecture.",
      highlights: [
        "Specialized in Network and Security",
        "Hands-on experience with AI and automation technologies",
        "Strong foundation in backend systems and API development"
      ]
    }
  ]

  return (
    <section id="education" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-primary">05</span>
            <h2 className="text-3xl md:text-4xl font-bold">Foundation</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Academic background and continuous learning that shaped my expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{edu.degree}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span className="font-medium">{edu.institution}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                    <Calendar className="h-4 w-4" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{edu.description}</p>
                
                <ul className="space-y-2">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">▹</span>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
