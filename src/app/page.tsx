
import { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: "Muhammad Asim - Full Stack Developer | React & Next.js Expert",
  description: "Welcome to Muhammad Asim's portfolio. Full-Stack Developer with 2+ years of experience building scalable web applications with React, Next.js, TypeScript, and Node.js. View my projects and services.",
  keywords: ["Muhammad Asim", "full-stack developer", "React developer", "Next.js", "TypeScript", "web developer portfolio", "frontend developer", "backend developer"],
  openGraph: {
    title: "Muhammad Asim - Full Stack Developer Portfolio",
    description: "Full-Stack Developer specializing in React, Next.js, and modern web technologies. Explore my projects and services.",
    type: "website",
    images: ["/assets/og_image.png"],
  },
};

export default function Home() {
  return <HomePage />;
}