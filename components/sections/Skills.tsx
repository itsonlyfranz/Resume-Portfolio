import { Chip, SectionHeading } from "../primitives";
import { SKILL_GROUPS } from "@/lib/portfolio";

/** Home-page stack preview: every skill as a chip, grouped detail lives on /stack. */
export function Skills() {
  const skills = SKILL_GROUPS.flatMap((group) => group.skills);
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
