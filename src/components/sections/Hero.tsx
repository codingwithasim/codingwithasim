'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

const Hero = () => {
 

  return (
    <section className="py-32 bg-black">
      <div className="relative ">
        
        <div className="flex items-center px-8 justify-center h-[550px]">
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