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
    { category: "AI & Automation", icon: Sparkles, items: ["LLM Agents", "Prompt Engineering", "MCP", "LangGraph", "n8n"] },
    { category: "Full Stack", icon: ReactIcon, items: ["Next.js", "React", "TypeScript", "Supabase", "RESTful APIs"] },
    { category: "Mobile", icon: NodeIcon, items: ["Swift", "SwiftUI", "SwiftData", "Swift Charts", "Apple Intelligence", "Kotlin", "Android"] },
    { category: "Web3 & Data", icon: Database, items: ["Polygon", "ethers.js", "OpenSea API", "PostgreSQL", "Git"] },
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
            AI-powered systems, full-stack products, mobile apps, and automation pipelines.
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
            <span className="text-sm font-medium">Available for AI, full-stack, and mobile projects</span>
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
                I&apos;m an AI Engineer and full-stack developer building LLM-based agents, backend systems, automation
                pipelines, and API-driven applications. I work across Python, TypeScript, Node.js, Next.js, and Supabase
                to turn AI capabilities into usable production features.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                My recent work includes a full-stack NFT marketplace with Polygon, ethers.js, OpenSea integrations, and
                Supabase-backed approval flows, plus a local-first iOS finance app built with SwiftUI, SwiftData, Swift
                Charts, and an Apple Intelligence-ready service abstraction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I focus on clean boundaries between UI, storage, services, and AI providers so products stay maintainable
                as they grow. When I&apos;m not coding, I&apos;m exploring new AI tooling, product ideas, and emerging mobile
                and Web3 patterns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What I Do</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Design and develop LLM-based agents, RAG systems, and AI workflow automations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Build full-stack products with Next.js, Supabase, TypeScript, and RESTful APIs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Implement blockchain and NFT marketplace flows with Polygon, ethers.js, and OpenSea</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Create local-first iOS apps with SwiftUI, SwiftData, and Swift Charts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Separate UI, storage, simulation, and AI provider logic with service-oriented architecture</span>
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
