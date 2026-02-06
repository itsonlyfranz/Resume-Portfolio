"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Skills() {
  const primarySkills = {
    title: "Primary Expertise",
    skills: [
      "LLM-based Agents", "Prompt Engineering", "Model Context Protocol (MCP)", 
      "Python", "Node.js", "TypeScript", "RESTful APIs", "n8n Automation"
    ]
  }

  const supportingSkills = {
    title: "Supporting Technologies",
    skills: [
      "Next.js", "React", "Supabase", "SQL", "Git", "Vercel AI SDK", 
      "Vector Databases", "Backend Architecture", "API Integration"
    ]
  }

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-primary">04</span>
            <h2 className="text-3xl md:text-4xl font-bold">How I Work</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Technologies and methodologies I use to deliver results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Primary Skills */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <CardTitle className="text-xl">{primarySkills.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {primarySkills.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="default"
                    className="hover:bg-primary/90 transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Supporting Skills */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                <CardTitle className="text-xl">{supportingSkills.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {supportingSkills.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
