import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavDrawerWrapper from "@/components/ui/NavDrawerWrapper";
import { Toaster } from "sonner";
import { organizationSchema, websiteSchema } from "./structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codingwithasim.vercel.app/'),
  title: {
    default: "Muhammad Asim - Full Stack Developer | React & Next.js Expert",
    template: "%s | Muhammad Asim - Full Stack Developer",
  },
  description: "Full-Stack Web Developer with 2+ years of experience. Specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable applications and beautiful user experiences.",
  keywords: ["web developer", "full-stack developer", "react developer", "nextjs", "typescript", "javascript", "frontend developer", "backend developer", "portfolio", "Muhammad Asim"],
  authors: [{ name: "Muhammad Asim", url: "https://codingwithasim.vercel.app/" }],
  creator: "Muhammad Asim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codingwithasim.vercel.app/",
    title: "Muhammad Asim - Full Stack Developer | React & Next.js Expert",
    description: "Full-Stack Web Developer with 2+ years of experience. Building scalable applications and beautiful user experiences with React, Next.js, and TypeScript.",
    siteName: "Muhammad Asim",
    images: [
      {
        url: "/assets/og_image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Asim - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Asim - Full Stack Developer",
    description: "Full-Stack Web Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@codingwithasim",
    images: ["/assets/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: 'xXvunaWinRHhEATANolfj6UJ_n1oi-HK4BvIlTB7CxU',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white p-2 rounded z-50">
          Skip to main content
        </a>
        <NavDrawerWrapper/>
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
