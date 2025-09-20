'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Globe, 
  ShoppingCart, 
  Smartphone
} from 'lucide-react';
import {  Utensils, RefreshCcw, Zap, Shield } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';


interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  pricing: [string, string];
  timeline: string;
}

export default function ServicesPage() {
  const { t } = useLanguage();

  const services: Service[] = [
    {
      id: "onepage",
      title: t('servicesPage.onepage.title'),
      description: t('servicesPage.onepage.description'),
      icon: Globe,
      features: [
        t('servicesPage.onepage.feature1'),
        t('servicesPage.onepage.feature2'),
        t('servicesPage.onepage.feature3'),
        t('servicesPage.onepage.feature4'),
      ],
      pricing: ["200€", "600€"],
      timeline: t('servicesPage.onepage.timeline'),
    },
    {
      id: "restaurant",
      title: t('servicesPage.restaurant.title'),
      description: t('servicesPage.restaurant.description'),
      icon: Utensils,
      features: [
        t('servicesPage.restaurant.feature1'),
        t('servicesPage.restaurant.feature2'),
        t('servicesPage.restaurant.feature3'),
        t('servicesPage.restaurant.feature4'),
      ],
      pricing: ["300€", "1200€"],
      timeline: t('servicesPage.restaurant.timeline'),
    },
    {
      id: "redesign",
      title: t('servicesPage.redesign.title'),
      description: t('servicesPage.redesign.description'),
      icon: RefreshCcw,
      features: [
        t('servicesPage.redesign.feature1'),
        t('servicesPage.redesign.feature2'),
        t('servicesPage.redesign.feature3'),
        t('servicesPage.redesign.feature4'),
      ],
      pricing: ["300€", "1000€"],
      timeline: t('servicesPage.redesign.timeline'),
    },
    {
      id: "performance",
      title: t('servicesPage.performance.title'),
      description: t('servicesPage.performance.description'),
      icon: Zap,
      features: [
        t('servicesPage.performance.feature1'),
        t('servicesPage.performance.feature2'),
        t('servicesPage.performance.feature3'),
        t('servicesPage.performance.feature4'),
      ],
      pricing: ["150€", "400€"],
      timeline: t('servicesPage.performance.timeline'),
    },
    {
      id: "maintenance",
      title: t('servicesPage.maintenance.title'),
      description: t('servicesPage.maintenance.description'),
      icon: Shield,
      features: [
        t('servicesPage.maintenance.feature1'),
        t('servicesPage.maintenance.feature2'),
        t('servicesPage.maintenance.feature3'),
        t('servicesPage.maintenance.feature4'),
      ],
      pricing: ["50€/month", "150€/month"],
      timeline: t('servicesPage.maintenance.timeline'),
    },
  ];


  const process = [
    {
      step: t('servicesPage.process.discovery.title'),
      description: t('servicesPage.process.discovery.description')
    },
    {
      step: t('servicesPage.process.development.title'), 
      description: t('servicesPage.process.development.description')
    },
    {
      step: t('servicesPage.process.launch.title'),
      description: t('servicesPage.process.launch.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16" role="banner">
        <div className="container-custom max-w-4xl">
          <div className="text-center space-y-6">
            <h3 className="mb-6">
              {t('servicesPage.title')}
            </h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              {t('servicesPage.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[t('servicesPage.badges.modernStack'), t('servicesPage.badges.seoReady'), t('servicesPage.badges.mobileFirst'), t('servicesPage.badges.performanceOptimized')].map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16" aria-labelledby="services-heading">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="services-heading">
              {t('servicesPage.whatIBuild.title')}<span className="text-gray-400 font-medium"> {t('servicesPage.whatIBuild.subtitle')}</span>
            </h4>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t('servicesPage.whatIBuild.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ icon: Icon, ...service }) => (
              <article 
                key={service.id}
                className="group border border-[#323232] rounded-lg p-8 hover:border-[#585858] transition-all duration-300 bg-black"
                itemScope 
                itemType="https://schema.org/Service"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                    <Icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-xl font-medium text-white mb-2"
                      itemProp="name"
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="text-white/60 text-sm leading-relaxed mb-4"
                      itemProp="description"
                    >
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <span className="text-white font-medium">{service.pricing[0] + " - " + service.pricing[1]}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/50">{service.timeline}</span>
                    </div>

                    <div className="space-y-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center text-white/50 text-sm">
                          <div className="w-1 h-1 rounded-full bg-white/30 mr-3 flex-shrink-0" aria-hidden="true"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16" aria-labelledby="process-heading">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="process-heading">
              {t('servicesPage.process.title')}
            </h4>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t('servicesPage.process.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{item.step}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16" aria-labelledby="additional-services-heading">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="additional-services-heading">
              {t('servicesPage.additional.title')}
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              t('servicesPage.additional.seo'),
              t('servicesPage.additional.performance'), 
              t('servicesPage.additional.maintenance'),
              t('servicesPage.additional.consulting')
            ].map((service) => (
              <div key={service} className="p-4 border border-[#323232] rounded-lg bg-black/50">
                <p className="text-white/70 text-sm">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" aria-labelledby="cta-heading">
        <div className="container-custom max-w-2xl">
          <div className="text-center border border-[#323232] rounded-lg p-8 bg-black/50">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="cta-heading">
              {t('servicesPage.cta.title')}
            </h4>
            <p className="text-white/60 mb-6">
              {t('servicesPage.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link 
                  href="/contact"
                  aria-label="Contact Muhammad Asim to discuss your project"
                >
                  {t('servicesPage.cta.getInTouch')}
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link 
                  href="/projects"
                  aria-label="View Muhammad Asim's previous work and projects"
                >
                  {t('servicesPage.cta.viewWork')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}