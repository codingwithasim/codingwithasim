import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found - Muhammad Asim',
  description: 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back on track.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="space-y-8">
          {/* 404 Display */}
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-bold text-[#22C55E]">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Go Home
            </Link>
            <Link href="/projets" className="btn-secondary">
              View Projects
            </Link>
            <Link href="/a-propos" className="btn-ghost">
              About Me
            </Link>
            <Link href="/blog" className="btn-ghost">
              Read Blog
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-[#1F2937]/30">
            <p className="text-white/60 mb-4">Or check out these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/contact" className="text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200">
                Contact
              </Link>
              <Link href="/cv" className="text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200">
                Resume
              </Link>
              <Link href="/outils" className="text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200">
                Tools & Setup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}