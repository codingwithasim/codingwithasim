
import SocialProof from '@/components/sections/SocialProof';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import SkillsStack from '@/components/sections/SkillsStack';
import CTABand from '@/components/sections/CTABand';
import FAB from '@/components/ui/fab';
import Hero from '@/components/sections/Hero';
import { LucideMessageCircleMore } from 'lucide-react';

export default function Home() {

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <Hero />

      {/* Social Proof Strip */}
      <SocialProof />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Skills & Stack */}
      <SkillsStack />

      {/* CTA Band */}
      <CTABand />

      {/* Floating Action Button*/}
      <FAB icon={LucideMessageCircleMore}/>

    </div>
  );
}