import { ImageResponse } from "next/og"
import { SITE_URL } from "@/lib/site"

export const alt = "Señor Roberto Francisco Pablo | AI Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#171413",
          color: "#f8f5f0",
        }}
      >
        <div style={{ display: "flex", width: 120, height: 8, background: "#f27a3a", borderRadius: 4 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            Señor Roberto Francisco Pablo
          </div>
          <div style={{ display: "flex", fontSize: 48, color: "#f27a3a", marginTop: 24 }}>AI Engineer</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#b8aea2" }}>
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  )
}
