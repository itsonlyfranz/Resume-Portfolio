import { Chip, SectionHeading } from "../primitives";

/** Curated highlights for the home preview; the full grouped list lives on /stack. */
const HOME_SKILLS = [
  "LLM Integration",
  "AI Agents",
  "LangGraph",
  "RAG",
  "Claude API",
  "Fine-tuning (LoRA)",
  "Hugging Face",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "TypeScript",
  "Next.js",
  "React",
  "Docker",
  "GitHub Actions",
];

/** Home-page stack preview: a short curated set of chips, full detail lives on /stack. */
export function Skills() {
  const skills = HOME_SKILLS;
  return (
    <div id="stack" className="mt-7 scroll-mt-20">
      <SectionHeading
        as="h3"
        title="04 — stack"
        href="/stack"
        linkLabel="view all →"
        className="mb-4"
      />
      <ul className="flex flex-wrap gap-2" aria-label="Tools and technologies">
        {skills.map((skill) => (
          <li key={skill}>
            <Chip>{skill}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}
