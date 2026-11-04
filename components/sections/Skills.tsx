const skillGroups = [
  {
    title: "AI & Automation",
    skills: ["AI Agents", "Prompt Engineering", "MCP", "RAG Systems", "LangGraph", "LangChain", "n8n Automation"],
  },
  {
    title: "Full Stack",
    skills: ["Next.js App Router", "React", "TypeScript", "Node.js", "Python", "FastAPI", "RESTful APIs", "Supabase", "Docker"],
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

export function Skills() {
  return (
    <div id="stack" className="stack-block">
      <div className="section-heading">
        <h3>STACK</h3>
        <span className="eyebrow">TOOLS & TECHNOLOGIES</span>
      </div>
      <div className="stack-groups">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h4 className="eyebrow muted">{group.title}</h4>
            <div className="stack-chips">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
