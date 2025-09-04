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
          <div className="flex flex-col h-fit mb-32 items-center justify-center space-y-7 z-9 text-center">
              <h2 className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#bfbfbf] to-white">
                I'm Asim, a web developer
              </h2>
            
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            I craft beautiful, functional web experiences that bring ideas to life. Specializing in modern web technologies and user-centered design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              
              <Button className='rounded-full' asChild>
              <Link href="/contact" className='py-6'>
                Get in Touch
              </Link>
              </Button>

              <Button variant="secondary" asChild className='bg-black rounded-full'>
                <Link href="/projects" className='py-6'>
                  View Projects
                </Link>
              </Button>
              
            </div>

          </div>

          <Image 
            fill
            loading='lazy'
            className='absolute object-cover hue-rotate-30 brightness-85'
            src="/assets/test.png"
            alt="Hero banner"/>

          <div className='absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-black to-transparent'></div>
              
          </div>
        </div>
    </section>
  );
};

export default Hero;