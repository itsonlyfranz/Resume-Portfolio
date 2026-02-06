"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      company: "THEOSYM",
      position: "AI Engineer / Backend Developer",
      period: "Nov 2024 - Present",
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
    <section id="experience" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-primary">03</span>
            <h2 className="text-3xl md:text-4xl font-bold">Where I Applied It</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Real-world projects and measurable impact in production environments.
          </p>
        </div>

        <div className={`mx-auto ${experiences.length === 1 ? "max-w-3xl" : "max-w-4xl"}`}>
          {experiences.length === 1 ? (
            // Single experience: centered card without timeline
            <div className="flex justify-center">
              <Card className="w-full hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between flex-col md:flex-row gap-2">
                    <div>
                      <CardTitle className="text-xl mb-1">{experiences[0].position}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span className="font-medium">{experiences[0].company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                      <Calendar className="h-4 w-4" />
                      <span>{experiences[0].period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{experiences[0].description}</p>
                  
                  {/* Two-column layout for Impact and Responsibilities */}
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    {/* Impact Section */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-foreground">Key Impact</h4>
                      <ul className="space-y-1.5">
                        {experiences[0].impact.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2 mt-1">▹</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Responsibilities Section */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-foreground">Responsibilities</h4>
                      <ul className="space-y-1.5">
                        {experiences[0].responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2 mt-1">▹</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-4 border-t">
                    <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[0].technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Multiple experiences: timeline layout
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-4 md:translate-y-0">
                      <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    </div>

                    <Card className="ml-8 md:ml-0 hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between flex-col md:flex-row gap-2">
                          <div className={index % 2 === 0 ? "md:text-right" : ""}>
                            <CardTitle className="text-xl mb-1">{exp.position}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Briefcase className="h-4 w-4" />
                              <span className="font-medium">{exp.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        
                        {/* Two-column layout */}
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          {/* Impact Section */}
                          <div>
                            <h4 className="text-sm font-semibold mb-3 text-foreground">Key Impact</h4>
                            <ul className="space-y-1.5">
                              {exp.impact.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-primary mr-2 mt-1">▹</span>
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Responsibilities Section */}
                          <div>
                            <h4 className="text-sm font-semibold mb-3 text-foreground">Responsibilities</h4>
                            <ul className="space-y-1.5">
                              {exp.responsibilities.map((item, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-primary mr-2 mt-1">▹</span>
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="pt-4 border-t">
                          <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
