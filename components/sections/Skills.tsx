const skillGroups = [
  {
    title: "AI and agents",
    skills: ["LLM Integration", "AI Agents", "LangChain", "LangGraph", "Workflow Orchestration", "n8n"],
  },
  {
    title: "Backend and APIs",
    skills: ["Python", "FastAPI", "Node.js", "Supabase", "API Integrations"],
  },
  {
    title: "Frontend and full-stack",
    skills: ["TypeScript", "Next.js", "React"],
  },
  {
    title: "Tools",
    skills: ["Docker"],
  },
  {
    title: "Mobile (iOS)",
    skills: ["Swift", "SwiftUI", "SwiftData", "Swift Charts", "Apple Intelligence"],
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
