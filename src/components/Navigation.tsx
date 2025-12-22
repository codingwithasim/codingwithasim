'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import LanguageSwitcher from './ui/LanguageSwitcher';
import ThemeToggle from './ui/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

type NavigationProps = {
  onMenuClick: () => void
}

const Navigation = ({onMenuClick}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/services', label: t('nav.services') },
    { path: '/about', label: t('nav.about') },
    { path: '/uses', label: t('nav.uses') },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0  right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/75 backdrop-blur-xl border-border' 
          : 'bg-background'
      }`}>
      <div className="container-custom relative">
        <div className='absolute h-full w-1/3 bg-cyan-200  dark:bg-cyan-800 blur-3xl top-0 left-0'></div>
        <div className='absolute h-full w-1/3 bg-amber-100 dark:bg-amber-800 blur-3xl top-0 right-0'></div>

        <div className="flex items-center justify-between h-16 z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Go to homepage">
            <motion.div 
              className="w-8 h-8 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image
              src="/assets/a_logo.png"
              className='dark:invert'
              alt="Muhammad Asim Logo"
              width={50}
              height={50}
              />
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`nav-link text-sm font-[400] rounded ${
                      pathname === item.path ? 'active' : ''
                    }`}
                    aria-current={pathname === item.path ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4 z-10">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild>
              <Link
                href="/contact"
                aria-label="Contact Muhammad Asim"
              >
                {t('nav.contact')}
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={onMenuClick} 
              className="md:hidden p-2 rounded-lg hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200"
              aria-label="Open navigation menu"
              aria-expanded="false"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;