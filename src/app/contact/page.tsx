'use client';

import PageTransition from '@/components/animations/PageTransition';
import ScrollFadeIn from '@/components/animations/ScrollFadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { LuGithub, LuLinkedin, LuLoader } from 'react-icons/lu';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ContactMethod {
  name: string;
  value: string;
  icon: IconType;
  link: string;
  description: string;
  actionLabel: string
}

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

type ContactField = keyof ContactFormState;

type ContactErrorKey =
  | ''
  | 'contact.form.errors.nameRequired'
  | 'contact.form.errors.emailRequired'
  | 'contact.form.errors.emailInvalid'
  | 'contact.form.errors.messageRequired';

type ContactErrors = Record<ContactField, ContactErrorKey>;

export default function Contact() {
  const { t } = useLanguage();

  const getInitialFormData = (): ContactFormState => ({
    name: '',
    email: '',
    message: '',
  });

  const [formData, setFormData] = useState<ContactFormState>(getInitialFormData);

  const [errors, setErrors] = useState<ContactErrors>({
    name: '',
    email: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: ContactErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'contact.form.errors.nameRequired';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'contact.form.errors.emailRequired';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'contact.form.errors.emailInvalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'contact.form.errors.messageRequired';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const isFormValid = () => {
    return Boolean(
      formData.name.trim() &&
      formData.email.trim() &&
      validateEmail(formData.email) &&
      formData.message.trim()
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if(!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY){
      toast.error(t('contact.toast.emailConfigError'));
      return;
    }

    setIsLoading(true);

    try {
      const submissionData = {
        ...formData,
        title: t('contact.form.defaultTitle'),
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        submissionData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      toast.success(t('contact.toast.success'));
      
      // Reset form
      setFormData(getInitialFormData());
      setErrors({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast.error(t('contact.toast.error'));
      console.error('Email send error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as ContactField;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: '',
      }));
    }
  };

  const contactMethods: ContactMethod[] = [
   
    {
      name: 'LinkedIn',
      value: 'muhammadasim',
      icon: LuLinkedin,
      link: 'https://www.linkedin.com/in/codingwithasim/',
      description: t('contact.methods.linkedin.description'),
      actionLabel: t('contact.methods.linkedin.action')
    },
    {
      name: 'GitHub',
      value: 'muhammadasim',
      icon: LuGithub  ,
      link: 'https://github.com/codingwithasim',
      description: t('contact.methods.github.description'),
      actionLabel: t('contact.methods.github.action')
    }
  ];

  const expectationKeys = [
    'contact.info.expectation1',
    'contact.info.expectation2',
    'contact.info.expectation3',
    'contact.info.expectation4',
  ] as const;

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-32 pb-16">
          <div className="container-custom">
            <ScrollFadeIn className="text-center">
              <h4 className="text-5xl md:text-6xl font-bold mb-6">
                {t('contact.hero.title')}
              </h4>
              <p className="text-black/60 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
                {t('contact.hero.description')}
              </p>
            </ScrollFadeIn>
          </div>
        </section>

        <div className="container-custom pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ScrollFadeIn delay={0.2}>
              <div>
            <h5 className="text-3xl font-bold text-black dark:text-white mb-8">
              {t('contact.form.sectionTitle')}
            </h5>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <label htmlFor="name" className="block text-black/80 dark:text-white/80 font-medium mb-2">
                  {t('contact.form.nameLabel')}
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.namePlaceholder')}
                  className={errors.name ? 'border-red-500' : 'border-dark-800'}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{t(errors.name)}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <label htmlFor="email" className="block text-black/80 dark:text-white/80 font-medium mb-2">
                  {t('contact.form.emailLabel')}
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                  className={errors.email ? 'border-red-500' : 'border-dark-800'}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{t(errors.email)}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <label htmlFor="message" className="block text-black/80 dark:text-white/80 font-medium mb-2">
                  {t('contact.form.messageLabel')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className={errors.message ? 'border-red-500' : 'border-dark-800'}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{t(errors.message)}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    t('contact.form.submit')
                  )}
                </Button>
              </motion.div>
            </form>
              </div>
            </ScrollFadeIn>

            {/* Contact Information */}
            <ScrollFadeIn delay={0.4}>
              <div>
            <h5 className="text-3xl font-bold text-black dark:text-white mb-8">
              {t('contact.info.title')}
            </h5>
            
            <ul className="space-y-8">
              {contactMethods.map(({icon: Icon, ...method}, index) => (
                <motion.li 
                  key={method.name} 
                  className="flex group items-start space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                  whileHover={{ x: 5 }}
                >
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
                </motion.li>
              ))}
            </ul>

            {/* Additional Info */}
            <motion.div 
              className="mt-12 p-6 border border-gray-200 dark:border-dark-800 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h5 className="text-lg font-semibold text-black dark:text-white mb-4">
                {t('contact.info.whatToExpect')}
              </h5>
              <ul className="space-y-2 text-black/70 dark:text-white/70 text-sm">
              {expectationKeys.map((key, idx) => {
                  return (
                    <motion.li 
                      key={key}  
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + idx * 0.1, duration: 0.4 }}
                    >
                      <div className="w-1.5 h-1.5 bg-black/40 dark:bg-dark-400 rounded-full"></div>
                      <span>{t(key)}</span>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
