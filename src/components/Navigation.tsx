'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';

type NavigationProps = {
  onMenuClick: () => void
}

const Navigation = ({onMenuClick}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/uses', label: 'Uses' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-dark-800 ${
      isScrolled 
        ? 'bg-black/75 backdrop-blur-xl border-b border-[#1F2937]/50' 
        : 'bg-black'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Go to homepage">
            <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Image
              src="/assets/a_logo.png"
              className='invert'
              alt="Muhammad Asim Logo"
              width={50}
              height={50}
              />
            </div>
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
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link
                href="/contact"
                aria-label="Contact Muhammad Asim"
              >
                Contact
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={onMenuClick} 
              className="md:hidden p-2 rounded-lg hover:bg-[#1F2937] focus:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-50 transition-colors duration-200"
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
    </nav>
  );
};

export default Navigation;