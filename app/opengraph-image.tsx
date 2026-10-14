import { ogImage, ogImageSize } from "@/components/seo/og-image"
import { siteConfig } from "@/lib/site"

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`
export const size = ogImageSize
export const contentType = "image/png"

export default function Image() {
  return ogImage({ headline: "Websites & web apps", muted: "that actually work." })
}
