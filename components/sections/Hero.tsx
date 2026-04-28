"use client"

import { Button } from "@/components/ui/button"
import { Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const heroEase = [0.22, 1, 0.36, 1] as const

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
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: heroEase }}
          className="relative h-28 w-28 overflow-hidden rounded-2xl border bg-card shadow-sm md:h-32 md:w-32"
        >
          <Image
            src="/profile.jpeg"
            alt="Profile photo of Señor Roberto Francisco Pablo"
            fill
            sizes="(min-width: 768px) 128px, 112px"
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: heroEase }}
            className="space-y-2"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Señor Roberto Francisco Pablo
              </h1>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Baguio City, Philippines
            </p>
            <p className="text-base font-medium text-foreground md:text-lg">
              Full Stack Developer \ AI Engineer \ Software Engineer
            </p>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              I build AI-powered full-stack applications, LLM-based agents, automation workflows, and product features that connect clean user experiences with reliable backend systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22, ease: heroEase }}
            className="flex flex-wrap gap-2"
          >
            <Button size="sm" onClick={() => scrollToSection("#contact")}>
              Get in touch
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="mailto:robertopablo13.rp@gmail.com">
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
