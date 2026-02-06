"use client"

import * as React from "react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("")
  const [scrollProgress, setScrollProgress] = React.useState(0)

  const navItems = [
    { name: "Overview", href: "#about", label: "1" },
    { name: "Projects", href: "#projects", label: "2" },
    { name: "Experience", href: "#experience", label: "3" },
    { name: "Skills", href: "#skills", label: "4" },
    { name: "Education", href: "#education", label: "5" },
    { name: "Certifications", href: "#certifications", label: "6" },
    { name: "Contact", href: "#contact", label: "7" },
  ]

  React.useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))

      // Update active section
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
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
    <header className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Progress indicator - tracks actual scroll position */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-primary/20 w-full">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{
            width: `${scrollProgress}%`
          }}
        />
      </div>

      <nav className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-sm font-medium transition-all duration-200 relative group hover:-translate-y-0.5 ${
                activeSection === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="hidden lg:inline-block mr-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                {item.label}.
              </span>
              {item.name}
              {activeSection === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/60 transition-all" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4 space-y-3">
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
                <span className="text-xs text-muted-foreground">{item.label}.</span>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
