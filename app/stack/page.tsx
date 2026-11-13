import type { Metadata } from "next";
import { Chip, PageShell } from "@/components/primitives";
import { SKILL_GROUPS } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Tools and technologies Señor Roberto Francisco Pablo works with across AI, fine-tuning, backend, frontend, iOS and Android.",
  alternates: { canonical: "/stack" },
};

export default function StackPage() {
  return (
    <PageShell
      title="tech stack"
      lede="The tools and technologies I work with — across AI and fine-tuning, backend and APIs, the front end, iOS and Android."
      width="max-w-3xl"
    >
      <div className="space-y-10">
        {SKILL_GROUPS.map((group, index) => (
          <section
            key={group.title}
            className="reveal"
            style={{ animationDelay: `${0.05 * (index + 1)}s` }}
          >
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-gray-400">
              {group.title}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <Chip size="md">{skill}</Chip>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
