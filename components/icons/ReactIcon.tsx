import React from "react"

export const ReactIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <circle cx="128" cy="128" r="40" fill="none" stroke="#61DAFB" strokeWidth="8"/>
    <ellipse cx="128" cy="128" rx="120" ry="40" fill="none" stroke="#61DAFB" strokeWidth="4" opacity="0.3"/>
    <ellipse cx="128" cy="128" rx="120" ry="40" fill="none" stroke="#61DAFB" strokeWidth="4" opacity="0.3" transform="rotate(60 128 128)"/>
    <ellipse cx="128" cy="128" rx="120" ry="40" fill="none" stroke="#61DAFB" strokeWidth="4" opacity="0.3" transform="rotate(120 128 128)"/>
    <circle cx="128" cy="88" r="8" fill="#61DAFB"/>
    <circle cx="128" cy="168" r="8" fill="#61DAFB"/>
  </svg>
)
