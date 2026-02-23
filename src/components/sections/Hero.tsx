'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import FadeIn from '../animations/FadeIn';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative isolate overflow-hidden border-b border-foreground/10">
      <div className="container-custom relative">
        <div className="min-h-[calc(100vh-72px)] flex flex-col justify-center items-center py-24 text-center">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary/80 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>{t('hero.availability')}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-10 space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold mx-auto max-w-4xl text-balance text-foreground">
              {t('hero.name')}
            </h1>
            <p className="text-lg md:text-xl font-medium text-foreground/70">
              {t('hero.title')}
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/70">
              {t('hero.description')}
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/60">
              <span>{t('hero.location')}</span>
              <span className="inline-flex h-1 w-1 rounded-full bg-foreground/40" />
              <span>{t('hero.experience')}</span>
            </div>
          </FadeIn>

          <FadeIn delay={1.0}>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
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
          </FadeIn>

          <FadeIn delay={1.2}>
            <div className="mt-16 flex flex-col items-center gap-3 text-xs text-foreground/50">
              <span>{t('hero.scroll')}</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20">
                <div className="h-6 w-px bg-foreground/40 animate-pulse" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
