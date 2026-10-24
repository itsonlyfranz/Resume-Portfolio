"use client"

export function About() {
  return (
    <section id="about" className="resume-section">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="resume-heading">About</h2>
        <a
          href="#contact"
          className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
        >
          Open to full-time AI engineer roles
        </a>
      </div>

      <div className="space-y-4 text-sm leading-6 text-muted-foreground">
        <p>
          I&apos;m an AI Engineer currently at Shiftcare. I build LLM-based agents and RAG workflows, with a focus on making them reliable: validated outputs, grounded citations, bounded loops, and human approval where it matters.
        </p>
        <p>
          My recent work includes seven open-source LangGraph agents (structured output, citation-grounded RAG, ReAct planning, multi-tool orchestration, memory, human-in-the-loop approval, and cost-aware routing), plus a RAG insurance assistant and full-stack and mobile projects.
        </p>
        <p>
          I focus on clean boundaries between UI, storage, services, and AI providers so products stay maintainable as they
          grow.
        </p>
      </div>
    </section>
  )
}
