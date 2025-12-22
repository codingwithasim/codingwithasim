'use client';

import BioSkills from "@/components/sections/about/Bio&Skills";
import AboutHeader from "@/components/sections/about/BioHeader";
import CTABand from "@/components/sections/about/CTABand";
import Hobbies from "@/components/sections/about/Hobbies";
import PhilosophySection from "@/components/sections/about/Philosophy";
import PageTransition from "@/components/animations/PageTransition";
import ScrollFadeIn from "@/components/animations/ScrollFadeIn";

export default function About() {

  return (
    <PageTransition>
      <div className="min-h-screen container-custom flex flex-col">
        {/* Header */}
        <ScrollFadeIn>
          <AboutHeader/>
        </ScrollFadeIn>

        {/* Bio & Technologies Section  */}
        <ScrollFadeIn delay={0.2}>
          <BioSkills/>
        </ScrollFadeIn>
        
        {/*Philosophy section with image*/}
        <ScrollFadeIn delay={0.4}>
          <PhilosophySection/>
        </ScrollFadeIn>

        {/*Hobbies section*/}
        <ScrollFadeIn delay={0.6}>
          <Hobbies/>
        </ScrollFadeIn>

        {/* CTA */}
        <ScrollFadeIn delay={0.8}>
          <CTABand/>
        </ScrollFadeIn>
      </div>
    </PageTransition>
  );
}