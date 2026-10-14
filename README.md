# codingwithasim.com

Portfolio of **Muhammad Asim**, a full-stack developer in Rouen, France, building websites and web apps for small businesses, founders and agencies.

**Live site → [codingwithasim.com](https://codingwithasim.com)**

[![Muhammad Asim — Websites & web apps that actually work](https://codingwithasim.com/opengraph-image)](https://codingwithasim.com)

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 · [shadcn/ui](https://ui.shadcn.com) (Base UI) · lucide-react · react-icons
- next-themes (light/dark mode) · Lenis (smooth scrolling)
- `next/og` for generated social share images and icons

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
app/
├── layout.tsx              Root layout: global metadata, font, theme, smooth scroll
├── page.tsx                Home page + structured data (JSON-LD)
├── contact/                Contact page + its own share image
├── not-found.tsx           Custom 404 page
├── opengraph-image.tsx     Generated 1200×630 share image (twitter-image re-uses it)
├── icon.tsx, apple-icon.tsx, favicon.ico
└── sitemap.ts, robots.ts, manifest.ts
components/
├── home/                   Page sections: header, hero, projects, services, process, about, FAQ, footer
├── contact/                Contact page section
├── seo/                    JSON-LD script tag + shared share-image renderer
└── ui/                     shadcn/ui primitives and background effects
lib/
├── site.ts                 Single source of truth: name, URL, description, email, socials, keywords
└── seo.ts                  Per-page metadata and structured-data builders
public/                     Project screenshots (WebP)
```

## Editing content

| To change… | Edit |
|---|---|
| Name, page title, description, email, social links, keywords | `lib/site.ts` |
| Projects | `projects` array in `components/home/projects.tsx` |
| Services | `components/home/services.tsx` |
| "How it works" steps | `components/home/process.tsx` |
| FAQ | `faqs` array in `components/home/faq.tsx` |
| About section & quick facts | `components/home/about-me.tsx` |
| Share image design | `components/seo/og-image.tsx` |

The `projects` and `faqs` arrays also feed the structured data, so search engines always see what's on the page.

**Adding a project:** export a screenshot at 16:10, convert it to WebP (about 2400px wide is plenty), put it in `public/`, and add an entry to the `projects` array:

```bash
magick screenshot.png -resize 2400x -quality 85 public/project-6.webp
```

## SEO

Built in, with nothing extra to configure:

- Per-page titles, descriptions and canonical URLs
- Open Graph and X (Twitter) cards with generated share images for each page
- JSON-LD structured data: `Person` (with social profiles), `WebSite`, `ProfilePage`, `FAQPage`, `ContactPage`, and one `CreativeWork` per project
- `sitemap.xml`, `robots.txt`, web app manifest, favicon and Apple touch icon
- Only one font (Inter) preloaded, plus compressed WebP screenshots, to keep pages fast

Useful checks after deploying: Google's [Rich Results Test](https://search.google.com/test/rich-results), the [Schema Markup Validator](https://validator.schema.org/), [PageSpeed Insights](https://pagespeed.web.dev/), and LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) for share previews.

## Deployment

The site is a standard Next.js app with no environment variables. [Vercel](https://vercel.com/new) is the simplest host:

1. Push this repository to GitHub.
2. Import it in Vercel. The framework is detected automatically, so keep the defaults.
3. Under **Settings → Domains**, add `codingwithasim.com` and `www.codingwithasim.com`, and make `www` **redirect** to `codingwithasim.com`. The canonical URLs use the version without `www`.
4. Add the domain to [Google Search Console](https://search.google.com/search-console) (DNS verification) and submit `https://codingwithasim.com/sitemap.xml`. Then import it into [Bing Webmaster Tools](https://www.bing.com/webmasters).

If the domain ever changes, update `url` in `lib/site.ts`. Every canonical URL, share image, sitemap entry and structured-data link is built from it.

## Contact

Have a project in mind? → [codingwithasim.com/contact](https://codingwithasim.com/contact) · [LinkedIn](https://www.linkedin.com/in/codingwithasim) · [GitHub](https://github.com/codingwithasim)
