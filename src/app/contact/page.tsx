'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { LuGithub, LuLinkedin, LuLoader } from 'react-icons/lu';
import { MdOutlineArrowOutward } from 'react-icons/md';
import emailjs from "@emailjs/browser";
import { toast } from 'sonner';

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
    title: 'New proposal for you',
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           validateEmail(formData.email) && 
           formData.message.trim();
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if(!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY){
      toast.error("Email service is not configured properly");
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form
      setFormData({
        title: 'New proposal for you',
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error('Email send error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
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
      link: 'https://github.com/codingwithasim',
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
            <p className="text-black/60 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
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
            <h5 className="text-3xl font-bold text-black dark:text-white mb-8">
              Send a Message
            </h5>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-black/80 dark:text-white/80 font-medium mb-2">
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
                  className={errors.name ? 'border-red-500' : 'border-dark-800'}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-black/80 dark:text-white/80 font-medium mb-2">
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
                  className={errors.email ? 'border-red-500' : 'border-dark-800'}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-black/80 dark:text-white/80 font-medium mb-2">
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
                  className={errors.message ? 'border-red-500' : 'border-dark-800'}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <>
                    <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="text-3xl font-bold text-black dark:text-white mb-8">
              Get in Touch
            </h5>
            
            <ul className="space-y-8">
              {contactMethods.map(({icon: Icon, ...method}) => (
                <li key={method.name} className="flex group items-start space-x-4">
                  <div className='p-1 text-black/70 dark:text-dark-300 group-hover:text-black dark:group-hover:text-white transition-colors'>
                    <Icon/>
                  </div>
                  <div className="flex-1">
                    <h6 className="text-lg font-semibold text-black/70 dark:text-dark-300 group-hover:text-black dark:group-hover:text-white transition-colors mb-2">
                      {method.name}
                    </h6>
                    
                    <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">
                      {method.description}
                    </p>
                  </div>

                  <Link target='_blank' href={method.link} className='border border-gray-300 dark:border-gray-600 p-2 rounded-full text-black/60 dark:text-gray-400 hover:border-black/60 dark:hover:border-gray-400 hover:text-black dark:hover:text-gray-200 transition-colors cursor-pointer'>
                    <MdOutlineArrowOutward/>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Additional Info */}
            <div className="mt-12 p-6 border border-gray-200 dark:border-dark-800 rounded-xl">
              <h5 className="text-lg font-semibold text-black dark:text-white mb-4">
                What to Expect
              </h5>
              <ul className="space-y-2 text-black/70 dark:text-white/70 text-sm">
              {
                ["Response within 24 hours", 
                  "Free initial consultation", 
                  "Detailed project proposal",
                  "Transparent pricing"
                ].map((info, idx) => {
                  return (
                    <li key={idx}  className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-black/40 dark:bg-dark-400 rounded-full"></div>
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