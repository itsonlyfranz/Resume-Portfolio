"use client"

export function Skills() {
  const skillGroups = [
    {
      title: "AI & Automation",
      skills: ["AI Agents", "Prompt Engineering", "MCP", "RAG Systems", "LangGraph", "LangChain", "n8n Automation"],
    },
    {
      title: "Full Stack",
      skills: ["Next.js App Router", "React", "TypeScript", "Node.js", "Python", "RESTful APIs", "Supabase"],
    },
    {
      title: "Mobile",
      skills: ["Swift", "SwiftUI", "SwiftData", "Swift Charts", "Apple Intelligence", "Kotlin", "Android"],
    },
    {
      title: "Web3 & Data",
      skills: ["Polygon", "ethers.js", "OpenSea API", "CoinGecko API", "PostgreSQL", "Zustand", "Git"],
    },
  ]

  return (
    <section id="skills" className="resume-section">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="resume-heading">Tech Stack</h2>
        <span className="text-xs text-muted-foreground">Tools I use to ship production work</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="rounded-xl border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="resume-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
