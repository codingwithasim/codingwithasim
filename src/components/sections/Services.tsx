'use client';

import { Globe, RefreshCcw, Utensils } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollFadeIn from '../animations/ScrollFadeIn';
import { Button } from "../ui/button";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  iconColor: string;
  label: string;
  highlight: string;
  accentGradient: string;
  accentLine: string;
  iconBackground: string;
  chipGradient: string;
  featureBackground: string;
  detailBackground: string;
  statsAccent: string;
  stats: {
    label: string;
    value: string;
  }[];
}

const Services = () => {
  const { t } = useLanguage();
  
  const services: Service[] = [
    {
      title: t('servicesPage.onepage.title'),
      description: t('servicesPage.onepage.description'),
      icon: Globe,
      features: [
        t('servicesPage.onepage.feature1'),
        t('servicesPage.onepage.feature2'),
        t('servicesPage.onepage.feature3'),
        t('servicesPage.onepage.feature4'),
      ],
      iconColor: 'text-[#22C55E]',
      label: 'Landing Page Build',
      highlight: t('servicesPage.onepage.description'),
      accentGradient: "from-white/95 via-emerald-50/65 to-emerald-100/30 dark:from-black dark:via-emerald-500/10 dark:to-black",
      accentLine: 'from-emerald-400/70 via-emerald-300/25 to-transparent',
      iconBackground: 'bg-gradient-to-br from-emerald-200/75 via-emerald-100/70 to-white/70 dark:from-emerald-500/40 dark:via-emerald-500/15 dark:to-transparent',
      chipGradient: 'from-emerald-400/35 via-emerald-300/25 to-emerald-200/25 dark:from-emerald-500/25 dark:via-emerald-500/20 dark:to-emerald-400/15',
      featureBackground: 'bg-gradient-to-r from-emerald-100/65 via-white/80 to-white/70 dark:from-emerald-500/20 dark:via-emerald-500/10 dark:to-transparent',
      detailBackground: 'from-white/95 via-emerald-50/60 to-white/80 dark:from-foreground/8 dark:via-emerald-500/20 dark:to-transparent',
      statsAccent: 'text-emerald-600 dark:text-emerald-200',
      stats: [
        { label: 'Timeline', value: t('servicesPage.onepage.timeline') },
        { label: 'Investment', value: '200€ – 600€' },
        { label: 'Focus', value: 'Single-page marketing sites' },
      ],
    },
    {
      title: t('servicesPage.restaurant.title'),
      description: t('servicesPage.restaurant.description'),
      icon: Utensils,
      features: [
        t('servicesPage.restaurant.feature1'),
        t('servicesPage.restaurant.feature2'),
        t('servicesPage.restaurant.feature3'),
        t('servicesPage.restaurant.feature4'),
      ],
      iconColor: 'text-[#8B5CF6]',
      label: 'Hospitality Website',
      highlight: t('servicesPage.restaurant.description'),
      accentGradient: "from-white/95 via-violet-50/65 to-violet-100/30 dark:from-black dark:via-violet-800/10 dark:to-black",
      accentLine: 'from-violet-400/70 via-violet-300/35 to-transparent',
      iconBackground: 'bg-gradient-to-br from-violet-200/75 via-violet-100/70 to-white/70 dark:from-violet-500/40 dark:via-violet-500/15 dark:to-transparent',
      chipGradient: 'from-violet-400/35 via-violet-300/25 to-violet-200/25 dark:from-violet-500/25 dark:via-violet-500/20 dark:to-violet-400/15',
      featureBackground: 'bg-gradient-to-r from-violet-100/65 via-white/80 to-white/70 dark:from-violet-500/20 dark:via-violet-500/10 dark:to-transparent',
      detailBackground: 'from-white/95 via-violet-50/60 to-white/80 dark:from-foreground/20 dark:via-violet-500/20 dark:to-transparent',
      statsAccent: 'text-violet-600 dark:text-violet-200',
      stats: [
        { label: 'Timeline', value: t('servicesPage.restaurant.timeline') },
        { label: 'Investment', value: '300€ – 1200€' },
        { label: 'Focus', value: 'Menus, bookings, local SEO' },
      ],
    },
    {
      title: t('servicesPage.redesign.title'),
      description: t('servicesPage.redesign.description'),
      icon: RefreshCcw,
      features: [
        t('servicesPage.redesign.feature1'),
        t('servicesPage.redesign.feature2'),
        t('servicesPage.redesign.feature3'),
        t('servicesPage.redesign.feature4'),
      ],
      iconColor: 'text-[#14B8A6]',
      label: 'Site Redesign',
      highlight: t('servicesPage.redesign.description'),
      accentGradient: "from-white/95 via-teal-50/65 to-teal-100/30 dark:from-black dark:via-teal-700/10 dark:to-teal-950/5",
      accentLine: 'from-teal-400/70 via-teal-300/35 to-transparent',
      iconBackground: 'bg-gradient-to-br from-teal-200/75 via-teal-100/70 to-white/70 dark:from-teal-500/40 dark:via-teal-500/15 dark:to-transparent',
      chipGradient: 'from-teal-400/35 via-teal-300/25 to-teal-200/25 dark:from-teal-500/25 dark:via-teal-500/20 dark:to-teal-400/15',
      featureBackground: 'bg-gradient-to-r from-teal-100/65 via-white/80 to-white/70 dark:from-teal-500/20 dark:via-teal-500/10 dark:to-transparent',
      detailBackground: 'from-white/95 via-teal-50/60 to-white/80 dark:from-foreground/20 dark:via-teal-500/20 dark:to-transparent',
      statsAccent: 'text-teal-600 dark:text-teal-200',
      stats: [
        { label: 'Timeline', value: t('servicesPage.redesign.timeline') },
        { label: 'Investment', value: '300€ – 1000€' },
        { label: 'Focus', value: 'UX audit + conversion lift' },
      ],
    },
  ];
  

  return (
    <section className="relative isolate py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-foreground/3 to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
      <div className="container-custom relative">
        <ScrollFadeIn className="text-center mb-16 space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t('services.title')}
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
          <Button variant="outline" size="lg" asChild className="border border-primary text-primary hover:bg-transparent dark:border-primary/60 dark:text-primary/80 dark:hover:bg-transparent">
            <Link href="/services">
              {t('service.more')}
            </Link>
          </Button>
        </ScrollFadeIn>

        <div className="flex flex-col gap-14">
          {services.map(({ icon: Icon, ...service }, index) => {
            const displayIndex = String(index + 1).padStart(2, '0');

            return (
              <ScrollFadeIn key={service.title} delay={index * 0.15}>
                <article className="relative overflow-hidden rounded-[2.75rem] border border-foreground/10 bg-white/92 p-8 md:p-12 backdrop-blur-xl dark:bg-foreground/[0.08]">
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.accentGradient}`} />
                  <div className="relative grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
                    <div className="space-y-8">
                      <div className="flex flex-wrap items-center gap-4 text-[0.7rem] uppercase tracking-[0.35em] text-foreground/55">
                        <span className="font-semibold">{displayIndex}</span>
                        <span className={`hidden h-px flex-1 bg-gradient-to-r ${service.accentLine} lg:block`} />
                        <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${service.chipGradient} px-5 py-2 text-[0.65rem] font-medium tracking-[0.35em] text-foreground/80 dark:text-foreground`}>
                          {service.label}
                        </span>
                      </div>

                      <div className="space-y-6">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                          <div className={`grid h-14 w-14 place-items-center rounded-2xl shadow-inner ${service.iconBackground}`}>
                            <Icon size={26} className={service.iconColor} />
                          </div>
                          <p className="text-sm md:text-base text-foreground/70 sm:max-w-sm">
                            {service.highlight}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-2xl md:text-[2rem] font-semibold text-foreground">
                            {service.title}
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground/70">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                          Core capabilities
                        </h5>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {service.features.map((feature) => (
                            <div
                              key={feature}
                              className={`relative overflow-hidden rounded-2xl border border-foreground/10 px-4 py-4 text-sm font-medium text-foreground/75 ${service.featureBackground}`}
                            >
                              <span className="relative z-10">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className={`relative overflow-hidden rounded-3xl border border-foreground/10 px-6 py-8 bg-gradient-to-br ${service.detailBackground}`}>
                        <div className="text-xs uppercase tracking-[0.3em] text-foreground/55">
                          Snapshot
                        </div>
                        <div className="mt-5 grid gap-4">
                          {service.stats.map((stat) => (
                            <div key={stat.label} className="flex items-center justify-between text-sm text-foreground/70">
                              <span className="font-medium text-foreground/85">{stat.label}</span>
                              <span className={`font-semibold ${service.statsAccent}`}>{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
