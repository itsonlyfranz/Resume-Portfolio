import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { Experience } from "@/components/sections/Experience"
import { Skills } from "@/components/sections/Skills"
import { Education } from "@/components/sections/Education"
import { Certifications } from "@/components/sections/Certifications"
import { Contact } from "@/components/sections/Contact"
import { allProjects } from "contentlayer/generated"

export default function Home() {
  const sortedProjects = [...allProjects].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-12 pt-20 md:px-6 md:pt-24">
        <Hero />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="min-w-0">
            <About />
            <Skills />
            <Projects projects={sortedProjects} />
            <Contact />
          </div>
          <aside className="min-w-0 space-y-6 lg:sticky lg:top-24">
            <Experience />
            <Education />
            <Certifications />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
