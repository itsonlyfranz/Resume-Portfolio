"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      badge: "⛓️"
    },
    {
      name: "Technical Support Fundamentals",
      issuer: "Google",
      date: "2024",
      credentialId: "Google-TSF",
      link: "https://www.coursera.org/",
      badge: "🛠️"
    },
    {
      name: "The Bits and Bytes of Computer Networking",
      issuer: "Google",
      date: "2024",
      credentialId: "Google-Network",
      link: "https://www.coursera.org/",
      badge: "🌐"
    }
  ]

  return (
    <section id="certifications" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-primary">06</span>
            <h2 className="text-3xl md:text-4xl font-bold">Credentials</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Professional certifications that validate my expertise and commitment to learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <Card key={index} className="hover:border-primary transition-colors group">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-3xl">{cert.badge}</span>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{cert.name}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="h-4 w-4" />
                        <span className="font-medium">{cert.issuer}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{cert.date}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Credential ID: <span className="font-mono">{cert.credentialId}</span>
                  </p>
                  
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    View Credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
