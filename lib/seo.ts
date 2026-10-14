import type { Metadata } from "next"

import { siteConfig } from "./site"

type PageSeo = {
  title?: string
  description?: string
  path: string
}

// Next.js merges metadata shallowly, so a page that sets `openGraph` or
// `twitter` replaces the layout's version entirely. Build them per page here.
export function pageMetadata({ title, description = siteConfig.description, path }: PageSeo): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title

  return {
    ...(title && { title }),
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: fullTitle,
      description,
    },
  }
}

const personId = `${siteConfig.url}/#person`
const websiteId = `${siteConfig.url}/#website`

const person = {
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  alternateName: siteConfig.handle,
  url: siteConfig.url,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: siteConfig.location.country,
  },
  knowsAbout: siteConfig.skills,
  knowsLanguage: siteConfig.languages,
  sameAs: Object.values(siteConfig.socials),
}

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteConfig.url,
  name: siteConfig.name,
  alternateName: [siteConfig.handle, "Coding with Asim"],
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": personId },
}

// One connected graph per page: the site, its owner, and whatever the page adds.
export function structuredData(...nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": [website, person, ...nodes],
  }
}

export function profilePage() {
  return {
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: siteConfig.title,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    inLanguage: "en",
  }
}

export function contactPage() {
  return {
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact#contactpage`,
    url: `${siteConfig.url}/contact`,
    name: `Contact ${siteConfig.name}`,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en",
  }
}

type FaqSeo = {
  question: string
  answer: string
}

export function faqPage(faqs: Array<FaqSeo>) {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

type ProjectSeo = {
  title: string
  description: string
  category: string
  image: string
  technologies: Array<string>
  link: string
}

export function projectWork(project: ProjectSeo) {
  return {
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.link,
    image: `${siteConfig.url}${project.image}`,
    genre: project.category,
    keywords: project.technologies.join(", "),
    creator: { "@id": personId },
  }
}
