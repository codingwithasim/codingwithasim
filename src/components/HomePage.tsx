'use client';

import SocialProof from '@/components/sections/SocialProof';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import SkillsStack from '@/components/sections/SkillsStack';
import Services from '@/components/sections/Services';
import CTABand from '@/components/sections/CTABand';
import Hero from '@/components/sections/Hero';
import PageTransition from '@/components/animations/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        
        {/* Hero Section */}
        <Hero />

        {/* Social Proof Strip */}
        <section aria-labelledby="social-proof-heading">
          <SocialProof />
        </section>

        {/* Services */}
        <section aria-labelledby="services-heading">
          <Services />
        </section>

        {/* Featured Projects */}
        <section aria-labelledby="projects-heading">
          <FeaturedProjects />
        </section>

        {/* Skills & Stack */}
        <section aria-labelledby="skills-heading">
          <SkillsStack />
        </section>

        {/* CTA Band */}
        <section aria-labelledby="cta-heading">
          <CTABand />
        </section>

      </div>
    </PageTransition>
  );
}