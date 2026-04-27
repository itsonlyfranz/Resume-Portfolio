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
          Available for AI, full-stack, and mobile projects
        </a>
      </div>

      <div className="space-y-4 text-sm leading-6 text-muted-foreground">
        <p>
          I&apos;m an AI Engineer and full-stack developer building LLM-based agents, backend systems, automation pipelines,
          and API-driven applications. I work across Python, TypeScript, Node.js, Next.js, and Supabase to turn AI
          capabilities into usable production features.
        </p>
        <p>
          My recent work focuses on AI-powered product systems: a LangGraph-based insurance assistant with RAG retrieval
          and multi-step quote orchestration, plus service-oriented mobile and full-stack projects where AI, data, and
          backend workflows stay cleanly separated.
        </p>
        <p>
          I focus on clean boundaries between UI, storage, services, and AI providers so products stay maintainable as they
          grow.
        </p>
      </div>
    </section>
  )
}
