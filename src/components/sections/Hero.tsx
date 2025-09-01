'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

const Hero = () => {
  const [displayedCode, setDisplayedCode] = useState('');

  const codeSnippet = `const developer = {
  name: "Muhammad Asim",
  role: "Web Developer",
  specialty: "React, Performance & DX",
  location: "Remote",
  available: true
};

function buildSomethingAmazing() {
  return "Let's create incredible web experiences!";
}

// Currently working on:
// Building modern web applications
// Performance optimization and UX
// Open source contributions

console.log(buildSomethingAmazing());`;

  useEffect(() => {
    const lines = codeSnippet.split('\n');
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < lines.length-1) {
        setDisplayedCode(prev => prev + lines[currentIndex] + '\n');
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-black">
      <div className="container-custom relative max-w-[1100px]">
        
        <div className="flex items-center justify-center h-[550px]">
          <div className="flex flex-col h-fit mb-12 items-center justify-center space-y-7 z-9 text-center">
              <h2 className="text-lg font-normal">
                I'm Asim, a web developer
              </h2>
            
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            I craft beautiful, functional web experiences that bring ideas to life. Specializing in modern web technologies and user-centered design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              
              <Button variant="outline" className='text-black rounded-full py-6'>
              <Link href="/contact">
                Get in Touch
              </Link>
              </Button>

              <Button variant="outline"  className='text-white border-black bg-black rounded-full py-6 hover:bg-[#1d1d1d] hover:text-white'>
                <Link href="/projects">
                  View Projects
                </Link>
              </Button>
              
            </div>

            <Image
              width={200}
              height={200}
              alt='A logo'
              src="/assets/a_logo.png"
              className='invert'/>

            
          </div>

          <Image 
            fill
            className='absolute hue-rotate-30 brightness-85'
            src="/assets/hero_banner.webp"
            alt="Hero banner"/>

          <div className='absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-black to-transparent'></div>
              
          </div>
        </div>
    </section>
  );
};

export default Hero;