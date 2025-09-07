import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Muhammad Asim - Full Stack Developer',
  description: 'Page not found. The requested page doesn\'t exist or has been moved. Navigate back to Muhammad Asim\'s portfolio to explore projects, skills, and contact information.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: '404 - Page Not Found | Muhammad Asim',
    description: 'Page not found. Return to Muhammad Asim\'s portfolio to explore web development projects and services.',
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black" role="main" aria-labelledby="error-heading">
      <div className="relative">
        <div className="flex items-center px-8 justify-center min-h-screen">
          <div className="flex flex-col h-fit items-center justify-center space-y-8 z-10 text-center max-w-4xl mx-auto">
            
            {/* 404 with Gradient Effect */}
            <div className="space-y-4">
              <h1 id="error-heading" className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#bfbfbf] to-white" aria-label="Error 404">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-white/90">
                Oops! This page seems to have wandered off
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed max-w-2xl">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry though - let's get you back to exploring amazing content.
            </p>

            {/* Status Badge like About page */}
            <Badge variant="secondary" className="py-2 px-4 flex gap-2" role="status" aria-live="polite">
              <div className="size-1.5 bg-red-400 animate-pulse rounded-full" aria-hidden="true"></div>
              Page Not Found
            </Badge>

            {/* Navigation Buttons inspired by Hero */}
            <nav className="flex flex-col sm:flex-row gap-4 pt-4" aria-label="Navigation options">
              <Button className='rounded-full px-8' asChild>
                <Link href="/" className='py-6' aria-label="Return to homepage">
                  Go Home
                </Link>
              </Button>

              <Button variant="secondary" asChild className='bg-black rounded-full border-white/20 hover:border-white/40'>
                <Link href="/projects" className='py-6' aria-label="Browse my projects">
                  View Projects
                </Link>
              </Button>
            </nav>

            {/* Quick Links */}
            <nav className="pt-8" aria-label="Quick navigation">
              <p className="text-white/60 mb-4 text-sm">Quick navigation:</p>
              <ul className="flex flex-wrap justify-center gap-6 text-sm" role="list">
                <li><Link href="/about" className="text-white/50 hover:text-[#22C55E] transition-colors duration-300 focus:text-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-50 rounded" aria-label="Learn about me">About</Link></li>
                <li><Link href="/contact" className="text-white/50 hover:text-[#22C55E] transition-colors duration-300 focus:text-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-50 rounded" aria-label="Get in touch">Contact</Link></li>
                <li><Link href="/uses" className="text-white/50 hover:text-[#22C55E] transition-colors duration-300 focus:text-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-opacity-50 rounded" aria-label="See tools I use">Uses</Link></li>
              </ul>
            </nav>

          </div>

          {/* Background Image with Gradient Overlay */}
          <Image 
            fill
            priority={false}
            className='absolute object-cover hue-rotate-180 brightness-50 opacity-30'
            src="/assets/test.png"
            alt=""
            aria-hidden="true"
            sizes="100vw"
          />

          {/* Gradient Overlays */}
          <div className='absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-black to-transparent' aria-hidden="true"></div>
          <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent' aria-hidden="true"></div>
        </div>
      </div>
    </main>
  );
}