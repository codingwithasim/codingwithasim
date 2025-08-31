'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { RiSupabaseLine, RiTailwindCssFill } from 'react-icons/ri';
import { SiTypescript } from 'react-icons/si';
import { TbBrandNextjs, TbBrandNodejs } from 'react-icons/tb';

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
    <section className="py-16  border-y border-[#1F2937]">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-white/40 text-sm font-medium uppercase tracking-wider">
          Technologies I Use
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-16">
            {[...companies, ...companies].map(({logo: Logo, ...company}, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center w-32 h-16 bg-[#141414] border border-[#1F2937]/30 rounded-lg group  transition-all duration-300"
              >
                <div className={`text-2xl font-bold text-white/30 transition-colors duration-300
                    group-hover:${company.color}`}>
                  {<Logo/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;