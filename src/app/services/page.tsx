'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Utensils, RefreshCcw, Zap, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/animations/PageTransition';
import ScrollFadeIn from '@/components/animations/ScrollFadeIn';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  pricing: [string, string];
  timeline: string;
}

const accentStyles = [
  {
    badge: 'border-foreground/20 text-foreground/70',
    dot: 'bg-foreground/40',
    icon: 'text-foreground/70',
  },
  {
    badge: 'border-foreground/20 text-foreground/70',
    dot: 'bg-foreground/40',
    icon: 'text-foreground/70',
  },
  {
    badge: 'border-foreground/20 text-foreground/70',
    dot: 'bg-foreground/40',
    icon: 'text-foreground/70',
  },
  {
    badge: 'border-foreground/20 text-foreground/70',
    dot: 'bg-foreground/40',
    icon: 'text-foreground/70',
  },
  {
    badge: 'border-foreground/20 text-foreground/70',
    dot: 'bg-foreground/40',
    icon: 'text-foreground/70',
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  const services: Service[] = [
    {
      id: 'onepage',
      title: t('servicesPage.onepage.title'),
      description: t('servicesPage.onepage.description'),
      icon: Globe,
      features: [
        t('servicesPage.onepage.feature1'),
        t('servicesPage.onepage.feature2'),
        t('servicesPage.onepage.feature3'),
        t('servicesPage.onepage.feature4'),
      ],
      pricing: ['200€', '600€'],
      timeline: t('servicesPage.onepage.timeline'),
    },
    {
      id: 'restaurant',
      title: t('servicesPage.restaurant.title'),
      description: t('servicesPage.restaurant.description'),
      icon: Utensils,
      features: [
        t('servicesPage.restaurant.feature1'),
        t('servicesPage.restaurant.feature2'),
        t('servicesPage.restaurant.feature3'),
        t('servicesPage.restaurant.feature4'),
      ],
      pricing: ['300€', '1200€'],
      timeline: t('servicesPage.restaurant.timeline'),
    },
    {
      id: 'redesign',
      title: t('servicesPage.redesign.title'),
      description: t('servicesPage.redesign.description'),
      icon: RefreshCcw,
      features: [
        t('servicesPage.redesign.feature1'),
        t('servicesPage.redesign.feature2'),
        t('servicesPage.redesign.feature3'),
        t('servicesPage.redesign.feature4'),
      ],
      pricing: ['300€', '1000€'],
      timeline: t('servicesPage.redesign.timeline'),
    },
    {
      id: 'performance',
      title: t('servicesPage.performance.title'),
      description: t('servicesPage.performance.description'),
      icon: Zap,
      features: [
        t('servicesPage.performance.feature1'),
        t('servicesPage.performance.feature2'),
        t('servicesPage.performance.feature3'),
        t('servicesPage.performance.feature4'),
      ],
      pricing: ['150€', '400€'],
      timeline: t('servicesPage.performance.timeline'),
    },
    {
      id: 'maintenance',
      title: t('servicesPage.maintenance.title'),
      description: t('servicesPage.maintenance.description'),
      icon: Shield,
      features: [
        t('servicesPage.maintenance.feature1'),
        t('servicesPage.maintenance.feature2'),
        t('servicesPage.maintenance.feature3'),
        t('servicesPage.maintenance.feature4'),
      ],
      pricing: ['50€/month', '150€/month'],
      timeline: t('servicesPage.maintenance.timeline'),
    },
  ];

  const process = [
    {
      step: t('servicesPage.process.discovery.title'),
      description: t('servicesPage.process.discovery.description'),
    },
    {
      step: t('servicesPage.process.development.title'),
      description: t('servicesPage.process.development.description'),
    },
    {
      step: t('servicesPage.process.launch.title'),
      description: t('servicesPage.process.launch.description'),
    },
  ];

  const additional = [
    t('servicesPage.additional.seo'),
    t('servicesPage.additional.performance'),
    t('servicesPage.additional.maintenance'),
    t('servicesPage.additional.consulting'),
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <section className="pt-28 pb-16" role="banner">
          <div className="container-custom max-w-5xl">
            <ScrollFadeIn className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {t('servicesPage.title')}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 dark:text-foreground/75">
                {t('servicesPage.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[t('servicesPage.badges.modernStack'), t('servicesPage.badges.seoReady'), t('servicesPage.badges.mobileFirst'), t('servicesPage.badges.performanceOptimized')].map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 + 0.2, duration: 0.25 }}
                  >
                    <Badge variant="outline" className="border border-foreground/20 text-foreground/70">
                      {badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </ScrollFadeIn>
          </div>
        </section>

        <section className="py-16" aria-labelledby="services-heading">
          <div className="container-custom max-w-5xl">
            <ScrollFadeIn delay={0.2} className="mb-14 space-y-4 text-center">
              <h2 className="text-3xl font-semibold text-foreground" id="services-heading">
                {t('servicesPage.whatIBuild.title')}
                <span className="text-foreground/60"> {t('servicesPage.whatIBuild.subtitle')}</span>
              </h2>
              <p className="text-sm md:text-base text-foreground/70 dark:text-foreground/75">
                {t('servicesPage.whatIBuild.description')}
              </p>
            </ScrollFadeIn>

            <div className="space-y-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {services.map(({ icon: Icon, ...service }, index) => {
                const accent = accentStyles[index % accentStyles.length];

                return (
                  <ScrollFadeIn key={service.id} delay={index * 0.12 + 0.3}>
                    <article
                      className="flex group h-full flex-col gap-6 rounded-2xl border border-foreground/12 bg-white/95 px-8 py-10 text-left dark:bg-foreground/[0.06]"
                      itemScope
                      itemType="https://schema.org/Service"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                          <Icon size={22} aria-hidden="true" className={accent.icon} />
                          <div>
                            <h3 className="text-xl font-semibold text-foreground" itemProp="name">
                              {service.title}
                            </h3>
                            <p className="text-sm text-foreground/65 dark:text-foreground/70">{service.timeline}</p>
                          </div>
                        </div>
                        
                      </div>

                      <p className="text-sm leading-relaxed text-foreground/70 dark:text-foreground/75" itemProp="description">
                        {service.description}
                      </p>

                      <div className="grid gap-2 text-sm text-foreground/70 dark:text-foreground/75 sm:grid-cols-2 lg:grid-cols-1">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3 rounded-xl border border-foreground/10  px-4 py-3 dark:border-foreground/20 ">
                            <span className={`mt-2 inline-flex h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/65 dark:text-foreground/70">
                        <span className="h-px flex-1 bg-foreground/15" />
                        <span className={`inline-flex items-center rounded-full ${accent.badge} border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em]`}>
                          {service.pricing[0]} – {service.pricing[1]}
                        </span>
                      </div>
                    </article>
                  </ScrollFadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16" aria-labelledby="process-heading">
          <div className="container-custom max-w-4xl">
            <ScrollFadeIn delay={0.4} className="mb-12 space-y-4 text-center">
              <h2 className="text-3xl font-semibold text-foreground" id="process-heading">
                {t('servicesPage.process.title')}
              </h2>
              <p className="text-sm md:text-base text-foreground/70 dark:text-foreground/75">
                {t('servicesPage.process.description')}
              </p>
            </ScrollFadeIn>

            <div className="space-y-6 grid-cols-1 grid md:grid-cols-3 gap-3">
              {process.map((item, index) => (
                <ScrollFadeIn key={item.step} delay={index * 0.1 + 0.5}>
                  <div className="flex flex-col gap-3 rounded-2xl border border-foreground/12 bg-white/95 px-6 py-5 text-left dark:border-foreground/20 dark:bg-foreground/[0.08]">
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{item.step}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70 dark:text-foreground/75">{item.description}</p>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12" aria-labelledby="additional-services-heading">
          <div className="container-custom max-w-4xl">
            <ScrollFadeIn delay={0.5} className="mb-10 text-center">
              <h2 className="text-2xl font-semibold text-foreground" id="additional-services-heading">
                {t('servicesPage.additional.title')}
              </h2>
            </ScrollFadeIn>

            <div className="flex flex-wrap justify-center gap-3 text-sm text-foreground/70 dark:text-foreground/75">
              {additional.map((item, index) => (
                <ScrollFadeIn key={item} delay={index * 0.08 + 0.55}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 dark:border-foreground/20">
                    <Shield size={14} />
                    {item}
                  </span>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24" aria-labelledby="services-cta">
          <div className="container-custom max-w-3xl">
            <ScrollFadeIn delay={0.6}>
              <article className="rounded-3xl border border-foreground/12 bg-white/95 p-10 text-center dark:border-foreground/20 dark:bg-foreground/[0.08]">
                <h2 className="text-3xl font-semibold text-foreground mb-4" id="services-cta">
                  {t('servicesPage.cta.title')}
                </h2>
                <p className="text-sm md:text-base text-foreground/70 dark:text-foreground/75 mb-6">
                  {t('servicesPage.cta.description')}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="border border-primary bg-primary text-primary-foreground hover:bg-primary dark:border-primary/60 dark:bg-primary dark:hover:bg-primary"
                  >
                    <Link href="/contact">{t('servicesPage.cta.getInTouch')}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border border-primary text-primary hover:bg-transparent dark:border-primary/55 dark:text-primary/80 dark:hover:bg-transparent"
                  >
                    <Link href="/projects">{t('servicesPage.cta.viewWork')}</Link>
                  </Button>
                </div>
              </article>
            </ScrollFadeIn>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
