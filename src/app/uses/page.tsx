'use client';

import Essentials from "@/components/sections/uses/Essentials";
import Meta from "@/components/sections/uses/Meta";
import Toolkit from "@/components/sections/uses/Toolkit";
import Workflow from "@/components/sections/uses/Workflow";
import Learning from "@/components/sections/uses/Learning";
import UsesHeader from "@/components/sections/uses/UsesHeader";
import PageTransition from "@/components/animations/PageTransition";
import ScrollFadeIn from "@/components/animations/ScrollFadeIn";

export default function Uses() {
  

  return (
    <PageTransition>
      <div className="min-h-screen mx-auto flex flex-col gap-4 px-4 bg-background">
        <ScrollFadeIn>
          <UsesHeader/>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.2}>
          <Essentials/>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.4}>
          <Toolkit/>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.6}>
          <Workflow/>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.8}>
          <Learning/>
        </ScrollFadeIn>

        <ScrollFadeIn delay={1.0}>
          <Meta/>
        </ScrollFadeIn>

      </div>
    </PageTransition>
  );
}