'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-32 bg-background">
      <div className="relative">
        
        <div className="flex items-center px-8 justify-center h-[580px]">
          <div className="flex flex-col h-fit mb-32 items-center justify-center space-y-7 z-10 text-center">
            
            {/* Status */}
            <div className="text-foreground/30 text-xs tracking-widest uppercase">
              {t('hero.availability')}
            </div>

            <div className="space-y-3">
              <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-muted-foreground to-foreground">
                {t('hero.name')}
              </h1>
              
              {/* Minimal rotating text */}
              <h2 className="font-medium text-foreground/60 transition-opacity duration-500">
                {t('hero.title')}
              </h2>
            </div>

            <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>

            {/* Minimal stats */}
            <div className="text-foreground/40 text-sm space-x-6">
              <span>{t('hero.location')}</span>
              <span>•</span>
              <span>{t('hero.experience')}</span>
              
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              
              <Button className='rounded-full' asChild>
                <Link href="/contact" className='py-6'>
                  {t('hero.getInTouch')}
                </Link>
              </Button>

              <Button variant="secondary" asChild className='bg-background rounded-full'>
                <Link href="/projects" className='py-6'>
                  {t('hero.viewProjects')}
                </Link>
              </Button>
              
            </div>

            {/* Mouse scroll indicator */}
            <div className="pt-8 flex flex-col items-center gap-2">
              <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-foreground/20 rounded-full mt-2 animate-bounce"></div>
              </div>
              <span className="text-foreground/20 text-xs">{t('hero.scroll')}</span>
            </div>

          </div>

          <Image 
            fill
            loading='lazy'
            className='absolute object-cover hue-rotate-30 brightness-85'
            src="/assets/test.png"
            alt="Hero banner"/>

          <div className='absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-background to-transparent'></div>
              
        </div>
      </div>
    </section>
  );
};

export default Hero;