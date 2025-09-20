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
    <section className="py-24 ">
      <div className="container-custom">
        <div className="card bg-card max-w-5xl mx-auto text-center border-[#22C55E]/20">
          <div className="space-y-8 ">
            {/* Main CTA */}
            <div className="space-y-4">
              <h4 className="font-bold mb-6 max-w-2xl mx-auto">
                {t('cta.title')}<span className='text-muted-foreground font-medium'> {t('cta.subtitle')}</span>
              </h4>
              <p className="text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                {t('cta.description')}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map(({icon: Icon, ...method}) => (
                <div key={method.name} className="text-center group flex flex-col items-center border border-border hover:border-muted-foreground py-6 px-4 rounded-md transition-colors">
                  <div className="text-4xl mb-3">
                    <Icon size={22} />
                  </div>          
                  <p className="text-foreground/60 text-sm leading-relaxed flex-1">
                    {method.description}
                  </p>
                  <Button variant="secondary" className='mt-4 border border-border'>
                        <Link href={method.link} target={method.name === "Email" ? "" : '_blank'}>{method.actionLabel}</Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              

              <Button  className='py-5'>
                <Link href="/contact">
                  {t('cta.startProject')}
                </Link>
              </Button>

              <Button variant="secondary" className='py-5 border border-border bg-card'>
                <Link href="/projects">
                  {t('cta.viewWork')}
                </Link>
              </Button>

            </div>

            {/* Additional Info */}
            <div className="pt-8 border-t border-border/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="text-center">
                  <div className="font-semibold mb-1">{t('cta.responseTime')}</div>
                  <div className="text-foreground/60">{t('cta.responseTimeValue')}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold mb-1">{t('cta.projectTypes')}</div>
                  <div className="text-foreground/60">{t('cta.projectTypesValue')}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold mb-1">{t('cta.availability')}</div>
                  <div className="text-foreground/60">{t('cta.availabilityValue')}</div>
                </div>
              </div>
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