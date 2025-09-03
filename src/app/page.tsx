"use client"


import HeroSection from '@/components/sections/HeroSection';
import SocialProof from '@/components/sections/SocialProof';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import SkillsStack from '@/components/sections/SkillsStack';
import AboutPreview from '@/components/sections/AboutPreview';
import OpenSource from '@/components/sections/OpenSource';
import WritingPreview from '@/components/sections/WritingPreview';
import Testimonials from '@/components/sections/Testimonials';
import NavDrawer from '@/components/ui/NavDrawer';
import CTABand from '@/components/sections/CTABand';
import FAB from '@/components/ui/fab';
import Hero from '@/components/sections/Hero';
import { LucideMessageCircleMore } from 'lucide-react';
import { useState } from 'react';

export default function Home() {

  const [open, setOpen] = useState(true)

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

      {/* About Preview */}
      {/* <AboutPreview /> */}

      {/* Open Source */}
      {/* <OpenSource /> */}

      {/* Writing Preview */}
      {/* <WritingPreview /> */}

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* CTA Band */}
      <CTABand />

      {/* Floating Action Button*/}
      <FAB icon={LucideMessageCircleMore}/>

    </div>
  );
}