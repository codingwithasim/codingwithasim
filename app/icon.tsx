import { ImageResponse } from "next/og"

export const size = {
  width: 192,
  height: 192,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 136,
          letterSpacing: -6,
          paddingBottom: 10,
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
