export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Señor Roberto Francisco Pablo",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourportfolio.com",
    email: "robertopablo13.rp@gmail.com",
    sameAs: [
      "https://linkedin.com/in/señor-roberto-francisco-pablo-b748581ba",
    ],
    jobTitle: "AI Engineer / Backend Developer",
    worksFor: {
      "@type": "Organization",
      name: "THEOSYM",
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
