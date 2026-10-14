import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// iOS applies its own rounded mask, so this one stays square.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 120,
          letterSpacing: -5,
          paddingBottom: 8,
        }}
      >
        A<span style={{ color: "#737373" }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  )
}
