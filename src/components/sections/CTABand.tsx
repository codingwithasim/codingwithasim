"use client"

import Link from 'next/link';
import { IconType } from 'react-icons';
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';
import { Button } from '../ui/button';
import { useState } from 'react';
import ContactDialog from '../models/Contact';

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
  const contactMethods: ContactMethod[] = [
    {
      name: 'Email',
      value: 'hello@muhammadasim.dev',
      icon: LuMail,
      link: '/contact',
      description: 'Reach out directly to discuss projects or collaborations',
      actionLabel: "Send a Message"
    },
    {
      name: 'LinkedIn',
      value: 'muhammadasim',
      icon: LuLinkedin,
      link: 'https://www.linkedin.com/in/codingwithasim',
      description: 'Connect professionally and follow my development journey',
      actionLabel: "Connect"
    },
    {
      name: 'GitHub',
      value: 'muhammadasim',
      icon: LuGithub,
      link: 'https://github.com/codingwithasim',
      description: 'Explore my code, projects, and open source contributions',
      actionLabel: "Check it out"
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
                Let's Build<span className='text-muted-foreground font-medium'> Something Amazing.</span>
              </h4>
              <p className="text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                Ready to turn your ideas into reality? Whether it's a web application,
                performance optimization, or a development tool, I'm here to help.
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
                  Start a Project
                </Link>
              </Button>

              <Button variant="secondary" className='py-5 border border-border bg-card'>
                <Link href="/projects">
                  View My Work
                </Link>
              </Button>

            </div>

            {/* Additional Info */}
            <div className="pt-8 border-t border-border/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="text-center">
                  <div className="font-semibold mb-1">Response Time</div>
                  <div className="text-foreground/60">Within 24 hours</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold mb-1">Project Types</div>
                  <div className="text-foreground/60">Web Apps, APIs, Tools</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold mb-1">Availability</div>
                  <div className="text-foreground/60">Currently accepting projects</div>
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