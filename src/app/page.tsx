
import { Metadata } from 'next';
import SocialProof from '@/components/sections/SocialProof';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import SkillsStack from '@/components/sections/SkillsStack';
import Services from '@/components/sections/Services';
import CTABand from '@/components/sections/CTABand';
import FAB from '@/components/ui/fab';
import Hero from '@/components/sections/Hero';
import { LucideMessageCircleMore } from 'lucide-react';

export const metadata: Metadata = {
  title: "Muhammad Asim - Full Stack Developer | React & Next.js Expert",
  description: "Welcome to Muhammad Asim's portfolio. Full-Stack Developer with 2+ years of experience building scalable web applications with React, Next.js, TypeScript, and Node.js. View my projects and services.",
  keywords: ["Muhammad Asim", "full-stack developer", "React developer", "Next.js", "TypeScript", "web developer portfolio", "frontend developer", "backend developer"],
  openGraph: {
    title: "Muhammad Asim - Full Stack Developer Portfolio",
    description: "Full-Stack Developer specializing in React, Next.js, and modern web technologies. Explore my projects and services.",
    type: "website",
    images: ["/og-home.jpg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero Section */}
      <Hero />

      {/* Social Proof Strip */}
      <section className="py-16" aria-labelledby="social-proof-heading">
        <SocialProof />
      </section>

      {/* Services */}
      <section className="py-16" aria-labelledby="services-heading">
        <Services />
      </section>

      {/* Featured Projects */}
      <section className="py-16" aria-labelledby="projects-heading">
        <FeaturedProjects />
      </section>

      {/* Skills & Stack */}
      <section className="py-16" aria-labelledby="skills-heading">
        <SkillsStack />
      </section>

      {/* CTA Band */}
      <section className="py-16" aria-labelledby="cta-heading">
        <CTABand />
      </section>
      
      {/* Floating Action Button*/}
      <FAB icon={LucideMessageCircleMore}/>

    </div>
  );
}