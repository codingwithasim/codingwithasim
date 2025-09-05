
import SocialProof from '@/components/sections/SocialProof';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import SkillsStack from '@/components/sections/SkillsStack';
import CTABand from '@/components/sections/CTABand';
import FAB from '@/components/ui/fab';
import Hero from '@/components/sections/Hero';
import { LucideMessageCircleMore } from 'lucide-react';

export default function Home() {

  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero Section */}
      <Hero />

      {/* Social Proof Strip */}
      <div className="py-16">
        <SocialProof />
      </div>

      {/* Featured Projects */}
      <div className="py-16">
        <FeaturedProjects />
      </div>

      {/* Skills & Stack */}
      <div className="py-16">
        <SkillsStack />
      </div>

      {/* CTA Band */}
      <div className="py-16">
        <CTABand />
      </div>
      

      {/* Floating Action Button*/}
      <FAB icon={LucideMessageCircleMore}/>

    </div>
  );
}