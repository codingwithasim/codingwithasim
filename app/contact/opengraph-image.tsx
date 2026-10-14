import { ogImage, ogImageSize } from "@/components/seo/og-image"
import { siteConfig } from "@/lib/site"

export const alt = `Contact ${siteConfig.name} — ${siteConfig.jobTitle}`
export const size = ogImageSize
export const contentType = "image/png"

export default function Image() {
  return ogImage({ headline: "Let's build", muted: "something together." })
}
