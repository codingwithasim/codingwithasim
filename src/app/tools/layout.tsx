import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ThemeToggle';

export const metadata: Metadata = {
  title: 'Free Online Tools | Toolbox',
  description:
    'Simple, fast, and privacy-friendly online tools for everyday tasks. Convert, generate, format, and calculate in one place.',
  keywords: [
    'online tools',
    'toolbox',
    'file converter',
    'text tools',
    'generators',
    'utilities',
    'calculators',
    'privacy-friendly tools',
    'free tools',
  ],
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Online Tools | Toolbox',
    description:
      'Simple, fast, and privacy-friendly online tools for everyday tasks. Convert, generate, format, and calculate in one place.',
    type: 'website',
    url: '/tools',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools | Toolbox',
    description:
      'Simple, fast, and privacy-friendly online tools for everyday tasks. Convert, generate, format, and calculate in one place.',
    images: ['/assets/og_image.png'],
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-16 min-h-screen bg-[#f5f7fb] text-slate-900 dark:bg-[#0b0f1a] dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="container-custom flex items-center justify-between py-4">
          <Link href="/tools" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-600 text-xs font-semibold uppercase text-white shadow-sm shadow-sky-500/20">
              TB
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold">Toolbox</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Fast, private utilities</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-500 dark:text-slate-400 md:flex">
            <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/">
              Home
            </Link>
            <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/tools">
              Tools
            </Link>
            <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/blog">
              Blog
            </Link>
            <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/about">
              About
            </Link>
            <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/contact">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:inline-flex">
              V1
            </span>
            <ThemeToggle />
            <Button asChild className="h-9 rounded-lg bg-sky-600 px-4 text-white hover:bg-sky-500">
              <Link href="/contact">
                Request Tool
                <ArrowUpRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
