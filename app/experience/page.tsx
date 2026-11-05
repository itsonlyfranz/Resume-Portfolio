import type { Metadata } from "next";
import { allExperiences } from "contentlayer/generated";
import { Chip, Monogram, PageShell } from "@/components/primitives";
import { bodyBlocks, formatMonth, monogram } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "AI engineering roles held by Señor Roberto Francisco Pablo, from LLM agents to backend systems.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  const experience = [...allExperiences].sort((a, b) => a.order - b.order);
  return (
    <PageShell
      title="experience"
      lede="Roles building LLM agents, backend services and the application layer around them."
    >
      <ol className="space-y-0">
        {experience.map((item, index) => {
          const blocks = bodyBlocks(item.body.raw);
          const last = index === experience.length - 1;
          return (
            <li key={item._id} className="reveal relative flex gap-4 sm:gap-5">
              <div className="flex flex-col items-center">
                <Monogram value={monogram(item.company)} />
                {!last && <div className="mt-2 w-px flex-1 bg-gray-200" />}
              </div>
              <div className={`min-w-0 flex-1 ${last ? "" : "pb-12"}`}>
                <h2 className="text-[16px] font-semibold leading-snug text-ink">
                  {item.company}
                </h2>
                <p className="mt-1 font-mono text-[12px] text-gray-500">
                  {item.endDate ? "Past role" : "Current role"}
                </p>
                <div className="mt-5">
                  <h3 className="text-[15px] font-medium text-ink">
                    {item.position}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gray-400">
                    {formatMonth(item.startDate)} –{" "}
                    {item.endDate ? formatMonth(item.endDate) : "Present"}
                  </p>
                  <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-gray-600">
                    <p>{item.description}</p>
                    {blocks.map((block, blockIndex) =>
                      block.kind === "p" ? (
                        <p key={blockIndex}>{block.text}</p>
                      ) : (
                        <ul
                          key={blockIndex}
                          className="list-disc space-y-1.5 pl-4 marker:text-gray-300"
                        >
                          {block.items.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                  {item.technologies.length > 0 && (
                    <ul
                      className="mt-4 flex flex-wrap gap-2"
                      aria-label="Technologies"
                    >
                      {item.technologies.map((tech) => (
                        <li key={tech}>
                          <Chip size="xs">{tech}</Chip>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </PageShell>
  );
}
