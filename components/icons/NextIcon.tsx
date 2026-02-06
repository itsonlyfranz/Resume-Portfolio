import React from "react"

export const NextIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <rect width="256" height="256" rx="40" fill="#000"/>
    <path d="M128 32L32 128l96 96V176l64-48-64-48V32z" fill="#FFF"/>
    <path d="M224 32v192h-32V32h32z" fill="#FFF"/>
  </svg>
)
