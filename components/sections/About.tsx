"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Database } from "lucide-react"
import { PythonIcon, TypeScriptIcon, SupabaseIcon, NodeIcon, ReactIcon, NextIcon, GitIcon } from "@/components/icons"
import { GitHubActivity } from "@/components/GitHubActivity"

// Icon mapping for tech items
const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Python": PythonIcon,
  "Node.js": NodeIcon,
  "TypeScript": TypeScriptIcon,
  "Next.js": NextIcon,
  "React": ReactIcon,
  "Supabase": SupabaseIcon,
  "Git": GitIcon,
}

export function About() {
  const techStack = [
    { category: "AI & ML", icon: Sparkles, items: ["LLM Agents", "Prompt Engineering", "MCP", "Vercel AI SDK"] },
    { category: "Backend", icon: NodeIcon, items: ["Python", "Node.js", "TypeScript", "RESTful APIs"] },
    { category: "Frameworks", icon: ReactIcon, items: ["Next.js", "React", "n8n"] },
    { category: "Infrastructure", icon: Database, items: ["Supabase", "Vector DBs", "SQL", "Git"] },
  ]

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-primary">01</span>
            <h2 className="text-3xl md:text-4xl font-bold">What I Build</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            AI-powered systems, automation pipelines, and scalable backend architectures.
          </p>
        </div>

        {/* Availability CTA */}
        <div className="mb-8 flex justify-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector("#contact")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 hover:bg-primary/20 transition-colors group"
          >
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">Currently available for AI/Backend projects</span>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Let&apos;s talk →</span>
          </a>
        </div>

        {/* GitHub Activity Widget */}
        <div className="mb-8 max-w-md mx-auto">
          <GitHubActivity />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I&apos;m an AI Engineer with hands-on experience building LLM-based AI agents, backend systems, and
                automation pipelines for production applications. I have a strong background in Python, TypeScript, 
                Node.js, and API-driven architectures.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Experienced in integrating AI capabilities into scalable systems, including structured AI integrations 
                using the Model Context Protocol (MCP). I specialize in AI workflow orchestration using n8n and building 
                robust backend systems that power AI-driven applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I thrive on solving complex technical challenges and making AI more accessible to businesses. 
                When I&apos;m not coding, I&apos;m exploring new AI models, contributing to open-source, or learning 
                about emerging technologies in the AI/ML space.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What I Do</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Design and develop LLM-based AI agents using prompt engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Build scalable backend systems and RESTful APIs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Create AI automation pipelines using n8n</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Implement AI integrations with Model Context Protocol (MCP)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Integrate AI-powered services into production systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
          {techStack.map((stack) => {
            const CategoryIcon = stack.icon
            return (
              <Card key={stack.category} className="hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <CategoryIcon className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-semibold">{stack.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => {
                      const TechIcon = techIcons[item]
                      return (
                        <Badge key={item} variant="secondary" className="flex items-center gap-1.5">
                          {TechIcon && <TechIcon className="h-3.5 w-3.5" />}
                          <span>{item}</span>
                        </Badge>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
