import BioSkills from "@/components/sections/about/Bio&Skills";
import AboutHeader from "@/components/sections/about/BioHeader";
import CTABand from "@/components/sections/about/CTABand";
import Hobbies from "@/components/sections/about/Hobbies";
import PhilosophySection from "@/components/sections/about/Philosophy";

export default function About() {

  return (
      <div className="min-h-screen container-custom flex flex-col">
        {/* Header */}
        <AboutHeader/>

        {/* Bio & Technologies Section  */}
        <BioSkills/>
        
        {/*Philosophy section with image*/}
        <PhilosophySection/>

        {/*Hobbies section*/}
        <Hobbies/>

        {/* CTA */}
        <CTABand/>
      </div>
  );
}