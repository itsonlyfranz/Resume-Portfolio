"use client";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
const links = [
  "projects",
  "experience",
  "stack",
  "certifications",
  "education",
  "contact",
];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-sidebar">
      <div className="sidebar-brand">
        <a href="#home">
          Señor Roberto
          <br className="desktop-break" /> Francisco Pablo
          <span className="brand-dot">.</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="sidebar-content"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div
        id="sidebar-content"
        className={`sidebar-content ${open ? "is-open" : ""}`}
      >
        <p className="eyebrow sidebar-caption">AI ENGINEER / PORTFOLIO</p>
        <nav aria-label="Main navigation">
          {links.map((link, i) => (
            <a key={link} href={`#${link}`} onClick={() => setOpen(false)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {link}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="ask-button"
            onClick={() => {
              window.dispatchEvent(new Event("portfolio:ask"));
              setOpen(false);
            }}
          >
            Ask anything <kbd>⌘ K</kbd>
          </button>
          <ThemeToggle />
          <p className="sidebar-caption">For work & collaborations</p>
          <a className="email-link" href="mailto:robertopablo13.rp@gmail.com">
            robertopablo13.rp@gmail.com ↗
          </a>
        </div>
      </div>
    </header>
  );
}
