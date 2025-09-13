export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muhammad Asim",
  "alternateName": "Asim Muhammad",
  "description": "Full-Stack Web Developer with 2+ years of experience specializing in React, Next.js, TypeScript, and modern web technologies.",
  "url": "https://codingwithasim.vercel.app/",
  "image": "https://codingwithasim.vercel.app//assets/profile.jpeg",
  "sameAs": [
    "https://github.com/codingwithasim",
    "https://www.linkedin.com/in/codingwithasim",
    "https://www.instagram.com/codingwithasim",
    "https://x.com/codingwithasim",
    "https://www.facebook.com/profile.php?id=61580246404401"
  ],
  "jobTitle": "Full-Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "knowsAbout": [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Supabase",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Muhammad Asim - Full Stack Developer Portfolio",
  "url": "https://codingwithasim.vercel.app/",
  "description": "Portfolio website of Muhammad Asim, a Full-Stack Developer specializing in React, Next.js, and modern web technologies.",
  "author": {
    "@type": "Person",
    "name": "Muhammad Asim"
  },
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Development Services",
  "description": "Professional web development services including landing pages, e-commerce solutions, and custom web applications built with modern technologies.",
  "provider": {
    "@type": "Person",
    "name": "Muhammad Asim",
    "jobTitle": "Full-Stack Developer",
    "url": "https://codingwithasim.vercel.app/"
  },
  "serviceType": "Web Development",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Page Development",
          "description": "High-converting landing pages with SEO optimization and fast loading times"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "E-commerce Development",
          "description": "Complete online stores with payment processing and inventory management"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Custom Web Applications",
          "description": "Tailored web applications built with modern frameworks"
        }
      }
    ]
  }
};