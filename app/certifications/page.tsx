import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BadgeCheck } from "lucide-react";
import { allCertifications } from "contentlayer/generated";
import { PageShell } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certifications earned by Señor Roberto Francisco Pablo.",
  alternates: { canonical: "/certifications" },
};

/** Fixed scatter offsets so cards look hand-placed but render deterministically. */
const SCATTER = [
  { rot: "-4deg", ty: "6px" },
  { rot: "3deg", ty: "-4px" },
  { rot: "-2deg", ty: "3px" },
  { rot: "4deg", ty: "-6px" },
];

export default function CertificationsPage() {
  const certifications = [...allCertifications].sort(
    (a, b) => a.order - b.order,
  );
  const groups = new Map<string, typeof certifications>();
  for (const item of certifications) {
    groups.set(item.issuer, [...(groups.get(item.issuer) ?? []), item]);
  }
  return (
    <PageShell
      title="certifications"
      lede="Courses and credentials I have completed, grouped by issuer."
      width="max-w-4xl"
    >
      <div className="space-y-12">
        {[...groups].map(([issuer, items]) => (
          <section key={issuer} className="reveal">
            <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-gray-400">
              {issuer}
            </h2>
            <ul className="grid grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item, index) => {
                const scatter = SCATTER[index % SCATTER.length];
                const style = {
                  "--rot": scatter.rot,
                  "--ty": scatter.ty,
                } as CSSProperties;
                const content = (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[6px] rounded-lg border border-gray-200/80"
                    />
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-paper">
                      <BadgeCheck
                        aria-hidden="true"
                        strokeWidth={1.6}
                        className="h-5 w-5 text-ink"
                      />
                    </span>
                    <h3 className="relative mt-3 text-[13px] font-semibold leading-snug text-ink">
                      {item.name}
                    </h3>
                    <p className="relative mt-1 font-mono text-[9.5px] uppercase tracking-wider text-gray-400">
                      {item.issuer} · {item.date}
                    </p>
                    {item.credentialId && (
                      <p className="relative mt-1 font-mono text-[9px] text-gray-400">
                        ID {item.credentialId}
                      </p>
                    )}
                    <p className="relative mt-3 text-[12px] leading-relaxed text-gray-500">
                      {item.body.raw.trim()}
                    </p>
                    {item.link && (
                      <span className="relative mt-auto pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-400">
                        ⟨ verify ⟩
                      </span>
                    )}
                  </>
                );
                const className =
                  "cert-card relative -m-1.5 flex flex-col items-center rounded-xl bg-gradient-to-b from-gray-50 to-paper px-4 py-5 text-center";
                return (
                  <li key={item._id} className="relative">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        style={style}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={className} style={style}>
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
