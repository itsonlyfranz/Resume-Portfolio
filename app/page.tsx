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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects projects={sortedProjects} />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
