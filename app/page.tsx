import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  FileSearch,
  GraduationCap,
  MapPin,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { SectionHeading } from "@/components/primitives";
import {
  OWNER_EMAIL,
  OWNER_NAME,
  SOCIAL_LINKS,
  formatMonth,
  padCount,
} from "@/lib/portfolio";
import {
  allProjects,
  allExperiences,
  allCertifications,
  allEducation,
} from "contentlayer/generated";

function Band({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`halftone halftone-wide mask-fade-x h-6 w-full opacity-[0.18] ${className}`}
    />
  );
}

export default function Home() {
  const projects = [...allProjects].sort((a, b) => a.order - b.order);
  const experience = [...allExperiences].sort((a, b) => a.order - b.order);
  const certifications = [...allCertifications].sort(
    (a, b) => a.order - b.order,
  );
  const education = [...allEducation].sort((a, b) => a.order - b.order);
  const current = experience[0];
  const school = education[0];

  const facts = [
    current && {
      Icon: BriefcaseBusiness,
      title: current.company,
      meta: current.position,
      href: "/experience",
    },
    school && {
      Icon: GraduationCap,
      title: school.institution,
      meta: school.degree,
      href: "/#education",
    },
    {
      Icon: MapPin,
      title: "Baguio City",
      meta: "Philippines",
      href: "/#contact",
    },
  ].filter(Boolean) as {
    Icon: typeof MapPin;
    title: string;
    meta: string;
    href: string;
  }[];

  const stats = [
    { value: padCount(projects.length), label: "projects", href: "/projects" },
    {
      value: padCount(experience.length),
      label: "roles in AI",
      href: "/experience",
    },
    {
      value: padCount(certifications.length),
      label: "certifications",
      href: "/certifications",
    },
  ];

  const cellPad = ["pr-3 sm:pr-5", "px-3 sm:px-5", "pl-3 sm:pl-5"];

  return (
    <main id="main" className="relative z-10 lg:pl-56">
      <div className="mx-auto max-w-2xl px-6">
        {/* ── Hero ── */}
        <section id="home" className="relative pb-16 pt-14 sm:pt-28">
          <div className="grid gap-9 sm:grid-cols-[18rem_1fr] sm:items-start sm:gap-10">
            <div className="reveal d1 mx-auto w-full max-w-[18rem] sm:mx-0">
              <Image
                src="/portrait-light.png"
                alt={OWNER_NAME}
                width={576}
                height={576}
                priority
                className="block h-auto w-full select-none dark:hidden"
              />
              <Image
                src="/portrait-dark.png"
                alt={OWNER_NAME}
                width={576}
                height={576}
                priority
                className="hidden h-auto w-full select-none dark:block"
              />
            </div>
            <div>
              <p className="reveal d2 mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                <span
                  aria-hidden="true"
                  className="pulse-dot h-1.5 w-1.5 rounded-full bg-ink"
                />
                AI Engineer · {current?.company ?? "ShiftCare"}
              </p>
              <h1 className="reveal d2 font-pixel text-3xl leading-[1.05] sm:text-[2.35rem]">
                {OWNER_NAME}
              </h1>
              <p className="intro-copy reveal d3 mt-6 text-[15px] text-gray-600">
                I build{" "}
                <span className="intro-tag">
                  <Bot aria-hidden="true" strokeWidth={1.7} />
                  LLM agents
                </span>{" "}
                with{" "}
                <span className="intro-tag">
                  <ShieldCheck aria-hidden="true" strokeWidth={1.7} />
                  validated outputs
                </span>{" "}
                and{" "}
                <span className="intro-tag">
                  <Quote aria-hidden="true" strokeWidth={1.7} />
                  grounded answers
                </span>
                , including a{" "}
                <span className="intro-tag">
                  <FileSearch aria-hidden="true" strokeWidth={1.7} />
                  RAG agent
                </span>{" "}
                with citation grounding.
              </p>
              <p className="reveal d4 mt-5 text-[15px] leading-relaxed text-gray-600">
                Open to remote international roles and relocating abroad.
              </p>
              <div className="reveal d5 mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12px] text-gray-500">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink"
                  >
                    {link.label} ↗
                  </a>
                ))}
                <a href="/resume.pdf" className="hover:text-ink">
                  résumé ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Fact strip ── */}
        <section
          aria-label="At a glance"
          className="reveal d6 border-t border-gray-200 py-5"
        >
          <ul className="grid grid-cols-3 divide-x divide-gray-200">
            {facts.map(({ Icon, title, meta, href }, index) => (
              <li key={title} className={`min-w-0 ${cellPad[index]}`}>
                <Link
                  href={href}
                  className="group flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="h-5 w-5 shrink-0 text-ink transition-opacity group-hover:opacity-60"
                  />
                  <span className="min-w-0 font-mono leading-tight">
                    <span className="line-clamp-2 block text-[12px] font-semibold text-ink">
                      {title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-[9px] uppercase tracking-wider text-gray-500 sm:text-[10px]">
                      {meta}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Stats strip ── */}
        <section aria-label="Highlights" className="border-t border-gray-200">
          <ul className="grid grid-cols-3 divide-x divide-gray-200">
            {stats.map((stat, index) => (
              <li key={stat.label} className={`py-6 ${cellPad[index]}`}>
                <Link href={stat.href} className="group block">
                  <span className="flex items-center gap-1">
                    <span className="font-pixel text-lg leading-none">
                      {stat.value}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3 w-3 -translate-y-1 text-gray-300 transition-transform group-hover:-translate-y-1.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </span>
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-wider text-gray-500 group-hover:text-ink">
                    {stat.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Band className="my-2" />

        <About />

        <Projects projects={projects} />

        {/* ── Experience ── */}
        <section id="experience" className="py-14">
          <SectionHeading
            title="03 — experience"
            href="/experience"
            linkLabel="full history →"
            className="mb-6"
          />
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {experience.map((item) => (
              <li
                key={item._id}
                className="grid grid-cols-12 items-baseline gap-x-3 gap-y-1 py-2.5 hover:bg-gray-50/80"
              >
                <span className="col-span-2 font-mono text-[11px] text-gray-400">
                  {item.startDate.slice(0, 4)}
                </span>
                <span className="col-span-10 sm:col-span-6">
                  <span className="block text-[14px] font-medium text-ink">
                    {item.position}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-gray-400">
                    {formatMonth(item.startDate)} —{" "}
                    {item.endDate ? formatMonth(item.endDate) : "Present"}
                  </span>
                </span>
                <span className="col-span-10 col-start-3 text-[13px] text-gray-500 sm:col-span-4 sm:col-start-auto sm:text-right">
                  {item.company}
                </span>
              </li>
            ))}
          </ul>
          <Skills />
        </section>

        {/* ── Certifications ── */}
        <section id="certifications" className="py-14">
          <SectionHeading
            title="05 — certifications"
            href="/certifications"
            linkLabel="all certifications →"
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {certifications.map((item) => (
              <li
                key={item._id}
                className="soft-shadow relative flex flex-col items-center rounded-xl bg-gradient-to-b from-gray-50 to-paper px-4 py-5 text-center"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[5px] rounded-lg border border-gray-200/70"
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
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-400 hover:text-ink"
                  >
                    ⟨ verify ⟩
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Education ── */}
        <section id="education" className="py-14">
          <SectionHeading title="06 — education" className="mb-6" />
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {education.map((item) => (
              <li
                key={item._id}
                className="grid grid-cols-12 items-baseline gap-x-3 gap-y-1 py-4"
              >
                <span className="col-span-12 font-mono text-[11px] text-gray-400 sm:col-span-3">
                  {item.startDate} — {item.endDate}
                </span>
                <div className="col-span-12 sm:col-span-9">
                  <h3 className="text-[14px] font-medium text-ink">
                    {item.degree}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-gray-500">
                    {item.institution}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-14">
          <SectionHeading title="07 — contact" className="mb-8" />
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-paper">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-6 sm:px-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                Let’s build something useful
              </p>
              <h3 className="mt-2 font-pixel text-lg leading-tight">
                Have a problem worth solving?
              </h3>
              <a
                href={`mailto:${OWNER_EMAIL}`}
                className="mt-3 inline-block break-all font-mono text-[13px] text-ink hover:text-gray-500"
              >
                {OWNER_EMAIL} ↗
              </a>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-600">
                Baguio City, Philippines · Open to relocating abroad
              </p>
            </div>
            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <Contact />
            </div>
          </div>
        </section>

        <Band className="mt-2" />
        <footer className="flex flex-wrap items-center justify-between gap-3 py-10 font-mono text-[11px] uppercase tracking-wider text-gray-400">
          <span>{OWNER_NAME}</span>
          <a href="#main" className="hover:text-ink">
            Back to top ↑
          </a>
        </footer>
      </div>
    </main>
  );
}
