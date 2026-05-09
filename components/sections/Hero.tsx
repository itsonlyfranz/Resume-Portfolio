"use client"

import { Button } from "@/components/ui/button"
import { Mail, MapPin } from "lucide-react"
import { domAnimation, LazyMotion, m } from "framer-motion"
import Image from "next/image"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pb-8">
      <div className="grid gap-6 border-b pb-8 md:grid-cols-[128px_1fr] md:items-start">
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative size-28 overflow-hidden rounded-2xl border bg-card shadow-sm md:size-32"
          >
            <Image
              src="/profile.jpeg"
              alt="Profile photo of Señor Roberto Francisco Pablo"
              fill
              sizes="(min-width: 768px) 128px, 112px"
              className="object-cover"
              priority
            />
          </m.div>
        </LazyMotion>

        <div className="space-y-4">
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Señor Roberto Francisco Pablo
                </h1>
              </div>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                Baguio City, Philippines
              </p>
              <p className="text-base font-medium text-foreground md:text-lg">
                Full Stack Developer \ AI Engineer \ Software Engineer
              </p>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                I build LLM-based AI agents, backend systems, automation pipelines, and full-stack product features with a focus on practical outcomes and maintainable architecture.
              </p>
            </m.div>
          </LazyMotion>

          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-2"
            >
              <Button size="sm" onClick={() => scrollToSection("#contact")}>
                Get in touch
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="mailto:robertopablo13.rp@gmail.com">
                  <Mail className="size-4" />
                  Send Email
                </a>
              </Button>
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </section>
  )
}
