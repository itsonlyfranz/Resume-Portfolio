import { SectionHeading } from "../primitives";

export function About() {
  return (
    <section id="about" className="py-14">
      <SectionHeading
        title="01 — about"
        href="/#contact"
        linkLabel="open to full-time AI engineer roles →"
      />
      <div className="space-y-4 text-[15px] leading-relaxed text-gray-600">
        <p>
          I&apos;m an AI Engineer focused on LLM agents and backend systems. At THEOSYM, I developed LLM-based agents, MCP integrations, and n8n automation pipelines using Python and Node.js APIs.
        </p>
        <p>
          I care about making AI reliable enough to ship: validated outputs, grounded answers, and clean boundaries between UI, storage, services, and AI providers, so products stay maintainable as they grow.
        </p>
        <p>
          Based in Baguio City, Philippines. Seeking remote international AI engineer roles and open to relocating abroad.
        </p>
      </div>
    </section>
  )
}
