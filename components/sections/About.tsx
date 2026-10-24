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
          I&apos;m an AI Engineer and full-stack developer at Shiftcare, building AI-powered applications from idea to deployment. Over the past two years at THEOSYM and Shiftcare, I&apos;ve shipped LLM-based agents, MCP integrations, and n8n automation pipelines into production systems through Python and Node.js APIs.
        </p>
        <p>
          I care about making AI reliable enough to ship: validated outputs, grounded answers, and clean boundaries between UI, storage, services, and AI providers, so products stay maintainable as they grow.
        </p>
        <p>
          Based in Baguio City, Philippines. Open to full-time AI engineer roles.
        </p>
      </div>
    </section>
  )
}
