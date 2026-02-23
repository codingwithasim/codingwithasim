'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { RiSupabaseLine, RiTailwindCssFill } from 'react-icons/ri';
import { SiTypescript } from 'react-icons/si';
import { TbBrandNextjs, TbBrandNodejs } from 'react-icons/tb';
import ScrollFadeIn from '../animations/ScrollFadeIn';

interface Company {
  name: string;
  logo: IconType;
  color: string
}


const SocialProof = () => {
  const companies: Company[] = [
    { name: 'JavaScript', logo: IoLogoJavascript, color: 'text-yellow-400' },   // bright yellow
    { name: 'TypeScript', logo: SiTypescript, color: 'text-blue-600' },         // deep blue
    { name: 'React', logo: FaReact, color: 'text-sky-400' },                    // cyan/light blue
    { name: 'Nextjs', logo: TbBrandNextjs, color: 'text-gray-200' },            // near-white
    { name: 'NodeJs', logo: TbBrandNodejs, color: 'text-green-500' },           // medium green
    { name: 'Supabase', logo: RiSupabaseLine, color: 'text-teal-400' },         // teal
    { name: 'Tailwind', logo: RiTailwindCssFill, color: 'text-teal-500' },      // slightly darker teal
  ];


  return (
    <section className="relative isolate overflow-hidden py-20">
      <div className="container-custom">
        <ScrollFadeIn className="text-center mb-12 space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
            Technologies I Use
          </p>
          <p className="text-sm text-foreground/60 max-w-xl mx-auto">
            A colorful toolkit of frameworks and platforms I rely on every day.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.2}>
          <div className="relative overflow-hidden rounded-full border border-foreground/10 bg-foreground/[0.04] py-6">
            <div className="flex animate-marquee items-center gap-14 px-8 text-foreground/40">
              {[...companies, ...companies].map(({ logo: Logo, ...company }, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex min-w-[120px] flex-col items-center justify-center gap-3"
                >
                  <Logo className={`text-3xl ${company.color}`} />
                  <span className="text-xs font-medium tracking-wider uppercase text-foreground/60">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
};

export default SocialProof;
