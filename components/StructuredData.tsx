import { SITE_URL } from "@/lib/site"

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Señor Roberto Francisco Pablo",
    url: SITE_URL,
    email: "robertopablo13.rp@gmail.com",
    sameAs: [
      "https://github.com/itsonlyfranz",
      "https://linkedin.com/in/señor-roberto-francisco-pablo-b748581ba",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of the Cordilleras",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Bachelor of Science in Information Technology",
      temporalCoverage: "2022/2026",
    },
    jobTitle: "AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Shiftcare",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baguio City",
      addressCountry: "Philippines"
    },
    description: "AI Engineer with hands-on experience building LLM-based AI agents, backend systems, and automation pipelines for production applications.",
    knowsAbout: [
      "Artificial Intelligence",
      "LLM-based Agents",
      "Python",
      "TypeScript",
      "Node.js",
      "Backend Development",
      "API Development",
      "Model Context Protocol",
      "n8n",
      "Automation",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
