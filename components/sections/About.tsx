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
          I&apos;m an AI Engineer focused on LLM agents and backend systems. At ShiftCare, I build full-stack AI agents, from the LLM agent logic to the backend services and application layer around them. Before that, I worked on a confidential early-stage product at a stealth-mode startup, and at THEOSYM I built AI-powered full-stack applications and backend APIs with LLM integrations and workflow automation.
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
