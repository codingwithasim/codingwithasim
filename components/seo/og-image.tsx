import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

export const ogImageSize = {
  width: 1200,
  height: 630,
}

type OgImageProps = {
  headline: string
  muted: string
}

const stack = ["React", "Next.js", "TypeScript", "Supabase"]

// Shared social card, styled like the site hero: a two-tone headline on dark.
export function ogImage({ headline, muted }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex" }}>
            {siteConfig.name}
            <span style={{ color: "#525252" }}>.</span>
          </div>
          <div style={{ display: "flex", color: "#a3a3a3" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, letterSpacing: -3, lineHeight: 1.08 }}>
            {headline}
          </div>
          <div style={{ display: "flex", fontSize: 92, letterSpacing: -3, lineHeight: 1.08, color: "#737373" }}>
            {muted}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#a3a3a3" }}>
            {siteConfig.jobTitle} · Rouen, France
          </div>
        </div>

        {/* Stack */}
        <div style={{ display: "flex", gap: 14 }}>
          {stack.map((technology) => (
            <div
              key={technology}
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 999,
                border: "1px solid #333333",
                background: "#171717",
                fontSize: 24,
                color: "#d4d4d4",
              }}
            >
              {technology}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    }
  )
}
