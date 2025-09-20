"use client"

import Link from 'next/link';
import { IconType } from 'react-icons';
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';
import { Button } from '../ui/button';
import { useState } from 'react';
import ContactDialog from '../models/Contact';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactMethod {
  name: string;
  value: string;
  icon: IconType;
  link: string;
  description: string;
  actionLabel: string
}

const CTABand = () => {
  const [open, setOpen]  = useState(false)
  const { t } = useLanguage();
  
  const contactMethods: ContactMethod[] = [
    {
      name: 'Email',
      value: 'hello@muhammadasim.dev',
      icon: LuMail,
      link: '/contact',
      description: t('cta.email.description'),
      actionLabel: t('cta.email.action')
    },
    {
      name: 'LinkedIn',
      value: 'muhammadasim',
      icon: LuLinkedin,
      link: 'https://www.linkedin.com/in/codingwithasim',
      description: t('cta.linkedin.description'),
      actionLabel: t('cta.linkedin.action')
    },
    {
      name: 'GitHub',
      value: 'muhammadasim',
      icon: LuGithub,
      link: 'https://github.com/codingwithasim',
      description: t('cta.github.description'),
      actionLabel: t('cta.github.action')
    }
  ];
  

  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto">
          
          {/* Main CTA */}
          <div className="text-center mb-16 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t('cta.title')}
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('cta.description')}
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map(({icon: Icon, ...method}) => (
              <div key={method.name} className="group text-center">
                <div className="relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-primary/5">
                  
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-primary bg-primary/10">
                    <Icon size={20} />
                  </div>
                  
                  {/* Content */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  
                  {/* Action button */}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={method.link} target={method.name === "Email" ? "" : '_blank'}>
                      {method.actionLabel}
                    </Link>
                  </Button>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild>
              <Link href="/contact">
                {t('cta.startProject')}
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                {t('cta.viewWork')}
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/50">
            <div className="text-center space-y-2">
              <div className="font-semibold text-sm text-foreground">{t('cta.responseTime')}</div>
              <div className="text-sm text-muted-foreground">{t('cta.responseTimeValue')}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="font-semibold text-sm text-foreground">{t('cta.projectTypes')}</div>
              <div className="text-sm text-muted-foreground">{t('cta.projectTypesValue')}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="font-semibold text-sm text-foreground">{t('cta.availability')}</div>
              <div className="text-sm text-muted-foreground">{t('cta.availabilityValue')}</div>
            </div>
          </div>
          
        </div>
      </div>

      {
        open && <ContactDialog open={open} setOpen={setOpen}/>
      }
    </section>
  );
};

export default CTABand;