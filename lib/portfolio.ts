export const OWNER_NAME = "Señor Roberto Francisco Pablo";
export const OWNER_EMAIL = "robertopablo13.rp@gmail.com";

export const SOCIAL_LINKS = [
  { label: "github", href: "https://github.com/itsonlyfranz" },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/señor-roberto-francisco-pablo-b748581ba",
  },
];

/** Sidebar entries, numbered to match the section headings (01–07). */
export const NAV_LINKS = [
  { number: "01", label: "about", href: "/#about" },
  { number: "02", label: "projects", href: "/projects" },
  { number: "03", label: "experience", href: "/experience" },
  { number: "04", label: "stack", href: "/stack" },
  { number: "05", label: "certifications", href: "/certifications" },
  { number: "06", label: "education", href: "/#education" },
  { number: "07", label: "contact", href: "/#contact" },
] as const;

export const SKILL_GROUPS = [
  {
    title: "AI and agents",
    skills: [
      "LLM Integration",
      "AI Agents",
      "LangChain",
      "LangGraph",
      "Workflow Orchestration",
      "n8n",
      "Claude API",
      "RAG",
      "Pydantic",
      "Groq",
      "OpenRouter",
    ],
  },
  {
    title: "ML and fine-tuning",
    skills: [
      "Fine-tuning (LoRA)",
      "MLX",
      "Hugging Face",
      "llama.cpp",
      "GGUF",
      "Quantization",
      "LLM Evaluation",
    ],
  },
  {
    title: "Backend and APIs",
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "Supabase",
      "API Integrations",
      "Firebase",
      "Stripe",
      "SQLite",
      "Zod",
      "PostgreSQL",
      "SQLAlchemy",
      "asyncpg",
      "Alembic",
      "Redis",
      "Uvicorn",
      "JWT auth",
    ],
  },
  {
    title: "Frontend and full-stack",
    skills: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "TanStack Query",
      "Vite",
      "React Router",
      "pnpm",
    ],
  },
  {
    title: "DevOps and tools",
    skills: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "CI/CD",
      "Self-hosted runners",
      "Vercel",
      "Git / GitHub",
      "nginx",
      "Caddy",
      "AWS (SES, Lightsail, EC2 Spot)",
      "Oracle Cloud (OCI)",
      "Monitoring",
    ],
  },
  {
    title: "Testing",
    skills: [
      "pytest",
      "Vitest",
      "Playwright",
    ],
  },
  {
    title: "Mobile (iOS and Android)",
    skills: [
      "Swift",
      "SwiftUI",
      "SwiftData",
      "Swift Charts",
      "Apple Intelligence",
      "Kotlin",
      "Jetpack Compose",
    ],
  },
];

/** "2026-05" → "May 2026" */
export function formatMonth(value: string) {
  return new Date(`${value}-01`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Stealth-Mode Startup" → "SM", "THEOSYM" → "TH" */
export function monogram(value: string) {
  const words = value.split(/[\s-]+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return value.slice(0, 2).toUpperCase();
}

export function padCount(value: number) {
  return value.toString().padStart(2, "0");
}

/**
 * Splits an MDX body into display blocks: consecutive "- " lines become a
 * list, other non-empty lines become paragraphs. Headings keep their text.
 */
export function bodyBlocks(raw: string) {
  const blocks: (
    | { kind: "p"; text: string }
    | { kind: "ul"; items: string[] }
  )[] = [];
  for (const line of raw.split("\n").map((value) => value.trim())) {
    if (!line) continue;
    if (line.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last?.kind === "ul") last.items.push(line.slice(2));
      else blocks.push({ kind: "ul", items: [line.slice(2)] });
    } else {
      blocks.push({ kind: "p", text: line.replace(/^#+\s*/, "") });
    }
  }
  return blocks;
}
