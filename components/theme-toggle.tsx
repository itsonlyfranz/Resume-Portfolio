"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

function subscribeToMountedState() {
  return () => {}
}

function getMountedSnapshot() {
  return true
}

function getServerMountedSnapshot() {
  return false
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    subscribeToMountedState,
    getMountedSnapshot,
    getServerMountedSnapshot
  )

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9">
        <Sun className="size-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="size-9"
    >
      <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
