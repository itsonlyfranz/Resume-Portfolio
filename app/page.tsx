import Image from "next/image";
import { Header } from "@/components/Header";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import {
  allProjects,
  allExperiences,
  allCertifications,
  allEducation,
} from "contentlayer/generated";
const date = (value: string) =>
  new Date(`${value}-01`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
export default function Home() {
  const projects = [...allProjects].sort((a, b) => a.order - b.order);
  const experience = [...allExperiences].sort((a, b) => a.order - b.order);
  const certifications = [...allCertifications].sort(
    (a, b) => a.order - b.order,
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="portfolio-main">
        <section id="home" className="hero-section">
          <div className="hero-grid">
            <div className="portrait-frame">
              <Image
                src="/profile-dithered.png"
                alt="Señor Roberto Francisco Pablo"
                width={288}
                height={320}
                priority
                className="portrait"
              />
              <span className="portrait-note">BAGUIO CITY, PHILIPPINES</span>
            </div>
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" /> AI ENGINEER · SHIFTCARE
              </p>
              <h1>
                Señor Roberto
                <br />
                Francisco Pablo<span className="brand-dot">.</span>
              </h1>
              <p>
                I build LLM agents with validated outputs and grounded answers,
                including a RAG agent with citation grounding.
              </p>
              <p className="muted">
                Open to remote international roles and relocating abroad.
              </p>
              <div className="social-links">
                <a
                  href="https://github.com/itsonlyfranz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github ↗
                </a>
                <a
                  href="https://linkedin.com/in/señor-roberto-francisco-pablo-b748581ba"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin ↗
                </a>
                <a href="/resume.pdf">résumé ↓</a>
              </div>
            </div>
          </div>
          <div className="stats-strip">
            <a href="#projects">
              <strong>{projects.length.toString().padStart(2, "0")}</strong>
              <span>PROJECTS</span>
            </a>
            <a href="#experience">
              <strong>{experience.length.toString().padStart(2, "0")}</strong>
              <span>ROLES IN AI</span>
            </a>
            <a href="#certifications">
              <strong>
                {certifications.length.toString().padStart(2, "0")}
              </strong>
              <span>CERTIFICATIONS</span>
            </a>
          </div>
        </section>
        <About />
        <Projects projects={projects} />
        <section id="experience" className="portfolio-section">
          <div className="section-heading">
            <h2>03 — experience</h2>
            <a href="#work-details">ALL →</a>
          </div>
          <table className="experience-table">
            <caption className="sr-only">Employment history</caption>
            <thead className="sr-only">
              <tr>
                <th>Year</th>
                <th>Role and dates</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((item) => (
                <tr className="experience-row" key={item._id}>
                  <td className="mono muted">{item.startDate.slice(0, 4)}</td>
                  <td>
                    <h3>{item.position}</h3>
                    <p className="mono muted">
                      {date(item.startDate)} —{" "}
                      {item.endDate ? date(item.endDate) : "Present"}
                    </p>
                  </td>
                  <td className="company">{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <details id="work-details" className="work-details">
            <summary>Role details</summary>
            {experience
              .filter((item) => item.description)
              .map((item) => (
                <div key={item._id}>
                  <h3>{item.company}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
          </details>
          <Skills />
        </section>
        <section id="certifications" className="portfolio-section">
          <div className="section-heading">
            <h2>05 — certifications</h2>
            <a href="#certification-list">ALL →</a>
          </div>
          <div id="certification-list" className="cert-grid">
            {certifications.map((item) => (
              <article className="cert-card" key={item._id}>
                <span className="cert-symbol" aria-hidden="true">
                  ✳
                </span>
                <p className="eyebrow">
                  {item.issuer} / {item.date}
                </p>
                <h3>{item.name}</h3>
                {item.link && (
                  <a
                    className="eyebrow"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VERIFY ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
        <section id="education" className="portfolio-section">
          <div className="section-heading">
            <h2>06 — education</h2>
          </div>
          {allEducation.map((item) => (
            <article className="education-row" key={item._id}>
              <span className="mono muted">
                {item.startDate} — {item.endDate}
              </span>
              <div>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <p className="muted">{item.description}</p>
              </div>
            </article>
          ))}
        </section>
        <section id="contact" className="portfolio-section contact-section">
          <p className="eyebrow">07 — LET’S BUILD SOMETHING USEFUL</p>
          <h2>
            Have a problem
            <br />
            worth solving<span className="brand-dot">?</span>
          </h2>
          <a href="mailto:robertopablo13.rp@gmail.com">
            robertopablo13.rp@gmail.com ↗
          </a>
          <p className="muted contact-location">
            Baguio City, Philippines · Open to relocating abroad
          </p>
          <Contact />
        </section>
        <footer className="portfolio-footer">
          <span>Señor Roberto Francisco Pablo</span>
          <a href="#home">Back to top ↑</a>
        </footer>
      </main>
    </>
  );
}
