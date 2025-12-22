"use client"

import Link from 'next/link';
import { IconType } from 'react-icons';
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';
import { Button } from '../ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollFadeIn from '../animations/ScrollFadeIn';

interface ContactMethod {
  name: string;
  icon: IconType;
  link: string;
}

const CTABand = () => {
  const { t } = useLanguage();

  const contactMethods: ContactMethod[] = [
    {
      name: 'Email',
      icon: LuMail,
      link: '/contact',
    },
    {
      name: 'LinkedIn',
      icon: LuLinkedin,
      link: 'https://www.linkedin.com/in/codingwithasim',
    },
    {
      name: 'GitHub',
      icon: LuGithub,
      link: 'https://github.com/codingwithasim',
    },
  ];

  return (
    <section className="relative isolate py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 opacity-[0.12] dark:from-foreground/20 dark:via-foreground/12 dark:to-foreground/18" />
      <div className="container-custom relative">
        <ScrollFadeIn>
          <article className="relative overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-white/95 px-8 py-12 text-center md:text-left dark:bg-foreground/[0.08]">
            <div className="relative space-y-8 md:max-w-3xl">
              <span className="text-xs uppercase tracking-[0.35em] text-foreground/60 dark:text-foreground/65">
                {t('cta.responseTime')}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t('cta.title')}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 dark:text-foreground/75">
                {t('cta.description')}
              </p>

              <div className="rounded-2xl border border-foreground/10 bg-white/90 px-6 py-5 text-sm text-foreground/75 dark:bg-foreground/[0.12] dark:text-foreground/70">
                <span className="font-semibold text-foreground/85 dark:text-foreground">
                  {t('cta.availabilityValue')}
                </span>
                <span className="mx-3 text-foreground/45">•</span>
                <span>{t('cta.projectTypesValue')}</span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="border border-primary bg-primary text-primary-foreground hover:bg-primary dark:border-primary/60 dark:bg-primary dark:hover:bg-primary"
                >
                  <Link href="/contact">
                    {t('cta.startProject')}
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border border-primary text-primary hover:bg-transparent dark:border-primary/55 dark:text-primary/80 dark:hover:bg-transparent"
                >
                  <Link href="/projects">
                    {t('cta.viewWork')}
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-6 md:justify-start">
                {contactMethods.map(({ icon: Icon, ...method }) => (
                  <Link
                    key={method.name}
                    href={method.link}
                    target={method.name === 'Email' ? undefined : '_blank'}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground/75 hover:border-primary/40 hover:text-primary dark:border-foreground/30 dark:text-foreground/70 dark:hover:border-primary/45 dark:hover:text-primary/80"
                  >
                    <Icon size={16} />
                    <span>{method.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </ScrollFadeIn>
      </div>
    </section>
  );
};

export default CTABand;
