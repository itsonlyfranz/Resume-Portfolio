"use client"

import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"

export function Certifications() {
  const certifications = [
    {
      name: "Blockchain",
      issuer: "Certification Provider",
      date: "2024",
      credentialId: "Blockchain-Cert",
      link: "#",
    },
    {
      name: "Technical Support Fundamentals",
      issuer: "Google",
      date: "2024",
      credentialId: "Google-TSF",
      link: "https://www.coursera.org/",
    },
    {
      name: "The Bits and Bytes of Computer Networking",
      issuer: "Google",
      date: "2024",
      credentialId: "Google-Network",
      link: "https://www.coursera.org/",
    }
  ]

  return (
    <section id="certifications" className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <Award className="h-4 w-4 text-primary" />
        <h2 className="resume-heading">Certifications</h2>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <div key={cert.name} className="border-t pt-4 first:border-t-0 first:pt-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold leading-5">{cert.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">{cert.date}</Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Credential ID: <span className="font-mono">{cert.credentialId}</span>
            </p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              View Credential
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
