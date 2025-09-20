'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { BsInstagram } from 'react-icons/bs';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerLinks = [
    { path: '/projects', label: t('nav.projects') },
    { path: '/about', label: t('nav.about') },
    { path: '/uses', label: t('nav.uses') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/codingwithasim', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/codingwithasim', icon: Linkedin },
    { name: 'Twitter', url: 'https://x.com/codingwithasim', icon: Twitter },
    { name: 'Facebook', url: 'https://instagram.com/codingwithasim', icon: BsInstagram },
  ];


  return (
    <footer className="border-t border-[#1F2937]/20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Navigation */}
          <div>
            <h6 className="font-medium mb-4">{t('footer.navigation')}</h6>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-white/40 hover:text-white/60 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center">
            <h6 className="font-medium mb-4">{t('footer.connect')}</h6>
            <div className="flex space-x-4 justify-center">
              {socialLinks.map(({icon: Icon, ...social}) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/60 transition-colors duration-200 p-2 rounded-lg hover:bg-[#1F2937]/30"
                  aria-label={social.name}
                >
                  <Icon size={18}/>
                </a>
              ))}
            </div>
          </div>


          {/* Copyright */}
          <div>
            <h6 className="font-medium mb-4">{t('footer.portfolio')}</h6>
            <p className="text-white/40 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <p className="text-white/30 text-xs mt-4">
              © {currentYear} Muhammad Asim. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;