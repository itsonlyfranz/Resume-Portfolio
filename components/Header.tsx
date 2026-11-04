"use client";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
const links = [
  { id: "about", label: "01" },
  { id: "projects", label: "02" },
  { id: "experience", label: "03" },
  { id: "stack", label: "04" },
  { id: "certifications", label: "05" },
  { id: "education", label: "06" },
  { id: "contact", label: "07" },
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
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>
              <span>{link.label}</span>
              {link.id}
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
