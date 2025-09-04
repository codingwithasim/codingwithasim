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
    { path: '/about', label: 'About' },
    { path: '/uses', label: 'Uses' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-700 ${
      isScrolled 
        ? 'bg-[#0B0F14]/80 backdrop-blur-xl border-b border-[#1F2937]/50' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              {/* <span className="text-white font-bold text-lg">A</span> */}
              <Image
              src="/assets/a_logo.png"
              className='invert'
              alt="Logo"
              width={50}
              height={50}
              />
            </div>
            
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center ">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link text-sm font-[400] ${
                  pathname === item.path ? 'active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button asChild >
              <Link
                href="/contact"
              >
                Contact
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-[#1F2937] transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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