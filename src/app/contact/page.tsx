'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu';
import { MdOutlineArrowOutward } from 'react-icons/md';

interface ContactMethod {
  name: string;
  value: string;
  icon: IconType;
  link: string;
  description: string;
  actionLabel: string
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods: ContactMethod[] = [
   
    {
      name: 'LinkedIn',
      value: 'muhammadasim',
      icon: LuLinkedin,
      link: 'https://www.linkedin.com/in/codingwithasim/',
      description: 'Professional networking and updates',
      actionLabel: "Let's talk"
    },
    {
      name: 'GitHub',
      value: 'muhammadasim',
      icon: LuGithub  ,
      link: 'https://github.com/asim-muhammad',
      description: 'View my code and open source contributions',
      actionLabel: "Let's talk"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h4 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Stay Connected
            </h4>
            <p className="text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to start a project or just want to discuss technology?
              I'm always open to new opportunities and collaborations.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h5 className="text-3xl font-bold text-white mb-8">
              Send a Message
            </h5>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 font-medium mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/80 font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/80 font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  
                  placeholder="Tell me about your project or what you'd like to discuss..."
                ></Textarea>
              </div>

              <Button
                type="submit"
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="text-3xl font-bold text-white mb-8">
              Get in Touch
            </h5>
            
            <ul className="space-y-8">
              {contactMethods.map(({icon: Icon, ...method}) => (
                <li key={method.name} className="flex group items-start space-x-4">
                  <div className='p-1 text-dark-300 group-hover:text-white transition-colors'>
                    <Icon/>
                  </div>
                  <div className="flex-1">
                    <h6 className="text-lg font-semibold text-dark-300 group-hover:text-white transition-colors mb-2">
                      {method.name}
                    </h6>
                    
                    <p className="text-white/60 text-sm leading-relaxed">
                      {method.description}
                    </p>
                  </div>

                  <Link target='_blank' href={method.link} className='border p-2 rounded-full text-gray-400 hover:border-gray-400 hover:text-gray-200 transition-colors cursor-pointer'>
                    <MdOutlineArrowOutward/>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Additional Info */}
            <div className="mt-12 p-6 border border-dark-900 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                What to Expect
              </h3>
              <ul className="space-y-2 text-white/70 text-sm">
              {
                ["Response within 24 hours", 
                  "Free initial consultation", 
                  "Detailed project proposal",
                  "Transparent pricing"
                ].map((info, idx) => {
                  return (
                    <li key={idx}  className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-dark-400 rounded-full"></div>
                      <span>{info}</span>
                    </li>
                  )
                })
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}