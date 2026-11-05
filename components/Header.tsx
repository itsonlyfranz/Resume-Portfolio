"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { NAV_LINKS, OWNER_EMAIL, OWNER_NAME } from "@/lib/portfolio";

function openAsk() {
  window.dispatchEvent(new Event("portfolio:ask"));
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] leading-none text-gray-500">
      {children}
    </kbd>
  );
}

function AskShortcut() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      <Kbd>⌘</Kbd>
      <span className="font-mono text-[10px] text-gray-400">+</span>
      <Kbd>K</Kbd>
    </span>
  );
}

function NavLinks({
  pathname,
  onNavigate,
  size,
}: {
  pathname: string;
  onNavigate?: () => void;
  size: "desktop" | "mobile";
}) {
  return (
    <ul
      className={
        size === "desktop" ? "flex flex-col gap-2.5" : "flex flex-col gap-4"
      }
    >
      {NAV_LINKS.map((link) => {
        const active = !link.href.includes("#") && pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group relative inline-flex w-fit items-baseline gap-2.5 ${
                active
                  ? "pl-[18px] text-ink"
                  : size === "desktop"
                    ? "text-gray-500 hover:text-ink"
                    : "text-gray-700 hover:text-ink"
              }`}
            >
              {active && (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2"
                />
              )}
              <span
                className={`inline-block w-[2.2ch] tabular-nums ${
                  active ? "text-ink" : "text-gray-400 group-hover:text-ink"
                }`}
              >
                {link.number}
              </span>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ContactNote({ size }: { size: "desktop" | "mobile" }) {
  const [user, domain] = OWNER_EMAIL.split("@");
  return (
    <>
      <p className="text-[12px] leading-relaxed text-gray-400">
        For work &amp; collaborations, reach me at
      </p>
      <a
        href={`mailto:${OWNER_EMAIL}`}
        className={`mt-1.5 inline-flex max-w-full items-start gap-2 font-mono text-ink hover:text-gray-500 ${
          size === "desktop" ? "text-[12px]" : "text-[13px]"
        }`}
      >
        <Mail
          aria-hidden="true"
          className="mt-[0.2em] h-[1.15em] w-[1.15em] shrink-0"
        />
        <span className="min-w-0">
          {user}
          <wbr />@{domain}
        </span>
      </a>
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-gray-200 bg-paper px-7 py-8 lg:flex">
        <Link
          href="/"
          className="shrink-0 font-pixel text-[15px] leading-[1.25] hover:opacity-60"
        >
          {OWNER_NAME}
        </Link>
        <nav
          aria-label="Main navigation"
          className="mt-9 flex flex-1 flex-col overflow-y-auto font-mono text-[13px]"
        >
          <NavLinks pathname={pathname} size="desktop" />
          <button
            type="button"
            onClick={openAsk}
            className="mt-6 inline-flex w-fit items-center gap-2 font-sans text-[12px] text-gray-400 hover:text-ink"
          >
            <span>Ask anything</span>
            <AskShortcut />
          </button>
        </nav>
        <div className="mt-5 shrink-0 border-t border-gray-200 pt-5">
          <div className="mb-4">
            <ThemeToggle />
          </div>
          <ContactNote size="desktop" />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-paper/90 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="truncate font-pixel text-[14px]">
            {OWNER_NAME}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
            className="-mr-1 shrink-0 p-1 text-gray-700 hover:text-ink"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`mobile-nav fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden ${
          open ? "is-open" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-3">
          <Link
            href="/"
            onClick={close}
            className="truncate font-pixel text-[14px]"
          >
            {OWNER_NAME}
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => {
              close();
              toggleRef.current?.focus();
            }}
            className="-mr-1 shrink-0 p-1 text-gray-700 hover:text-ink"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto px-7 py-8 font-mono text-[16px]">
          <nav
            aria-label="Mobile navigation"
            className="mnav-group"
            style={{ transitionDelay: "0.05s" }}
          >
            <NavLinks pathname={pathname} onNavigate={close} size="mobile" />
          </nav>
          <div className="my-5 h-px bg-gray-200" />
          <div
            className="mnav-group flex flex-col gap-5"
            style={{ transitionDelay: "0.11s" }}
          >
            <button
              type="button"
              onClick={() => {
                close();
                openAsk();
              }}
              className="inline-flex w-fit items-center gap-2 text-[14px] text-gray-500 hover:text-ink"
            >
              <span>ask anything</span>
              <AskShortcut />
            </button>
          </div>
          <div className="my-5 h-px bg-gray-200" />
          <div className="mnav-group" style={{ transitionDelay: "0.17s" }}>
            <div className="mb-4">
              <ThemeToggle />
            </div>
            <ContactNote size="mobile" />
          </div>
        </div>
      </div>
    </>
  );
}
