"use client"

import * as React from "react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

interface HeaderScrollState {
  activeSection: string
  scrollProgress: number
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [{ activeSection, scrollProgress }, setScrollState] = React.useReducer(
    (_state: HeaderScrollState, nextState: HeaderScrollState) => nextState,
    {
      activeSection: "",
      scrollProgress: 0,
    }
  )

  React.useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      const nextScrollProgress = Math.min(100, Math.max(0, progress))

      // Update active section
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100
      const aboutEl = document.getElementById("about")
      let nextActiveSection = ""

      if (aboutEl && scrollPosition < aboutEl.offsetTop) {
        nextActiveSection = "#about"
      } else {
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              nextActiveSection = `#${section}`
              break
            }
          }
        }
      }

      setScrollState({
        activeSection: nextActiveSection,
        scrollProgress: nextScrollProgress,
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="absolute bottom-0 left-0 h-px w-full bg-border">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{
            width: `${scrollProgress}%`
          }}
        />
      </div>

      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-x-2">
          <span className="text-sm font-semibold tracking-tight">Señor Roberto Francisco Pablo</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`relative text-xs font-medium transition-colors ${
                activeSection === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}
              {activeSection === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary transition-all" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-x-2">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="mx-auto max-w-5xl space-y-3 p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`flex items-center gap-2 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
