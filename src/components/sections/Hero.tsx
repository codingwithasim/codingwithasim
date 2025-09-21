'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="min-h-[calc(100vh-68px)] flex items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          {/* Status badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-muted-foreground">{t('hero.availability')}</span>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {t('hero.name')}
            </h1>
            
            <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
              {t('hero.title')}
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          {/* Location & Experience */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>{t('hero.location')}</span>
            <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
            <span>{t('hero.experience')}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                {t('hero.getInTouch')}
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                {t('hero.viewProjects')}
              </Link>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-0 translate-y-full left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-bounce"></div>
            </div>
            <span className="text-xs text-muted-foreground/60">{t('hero.scroll')}</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;