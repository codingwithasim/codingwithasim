'use client';

import Link from 'next/link';
import { ArrowUpRight, LucideIcon, Search, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Braces,
  Fingerprint,
  KeyRound,
  Hash,
  Cloud,
  ArrowLeftRight,
  Link2,
  Palette,
  FileText,
  Regex,
  FileCode,
  Clock,
  Database,
  FileJson,
  GitCompare,
} from "lucide-react";
import { Badge } from '@/components/ui/badge';

type Tool = {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  href: string;
  isPopular?: boolean;
  styles: string
};

type SortMode = 'popular' | 'name';

const tools: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON instantly.",
    category: "Developer",
    icon: Braces,
    href: "/tools/json-formatter",
    isPopular: true,
    styles: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:border-blue-500/40",
  },
  {
    name: "UUID Generator",
    description: "Generate UUID v4 identifiers instantly.",
    category: "Generators",
    icon: Fingerprint,
    href: "/tools/uuid-generator",
    isPopular: true,
    styles: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-200 dark:border-purple-500/40",
  },
  {
    name: "JWT Decoder",
    description: "Inspect JWT headers and payloads.",
    category: "Security",
    icon: KeyRound,
    href: "/tools/jwt-decoder",
    styles: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-200 dark:border-orange-500/40",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes.",
    category: "Security",
    icon: Hash,
    href: "/tools/hash-generator",
    styles: "bg-red-50 w-13 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-200 dark:border-red-500/40",
  },
  {
    name: "API Tester",
    description: "Send REST requests with headers and body.",
    category: "Developer",
    icon: Cloud,
    href: "/tools/api-tester",
    styles: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-200 dark:border-indigo-500/40",
  },
  {
    name: "Curl → Fetch",
    description: "Paste curl → get JS fetch code.",
    category: "Developer",
    icon: ArrowLeftRight,
    href: "/tools/curl-to-fetch",
    styles: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-200 dark:border-sky-500/40",
  },
  {
    name: "URL Encoder / Decoder",
    description: "Encode or decode URL components instantly.",
    category: "Converters",
    icon: Link2,
    href: "/tools/url-encoder",
    styles: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-200 dark:border-teal-500/40",
  },
  {
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL.",
    category: "Converters",
    icon: Palette,
    href: "/tools/color-converter",
    styles: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-200 dark:border-pink-500/40",
  },
  {
    name: "Lorem Ipsum",
    description: "Generate placeholder text quickly.",
    category: "Text",
    icon: FileText,
    href: "/tools/lorem-ipsum",
    styles: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-500/40",
  },
  {
    name: "Regex Tester",
    description: "Test patterns against sample text.",
    category: "Developer",
    icon: Regex,
    href: "/tools/regex-tester",
    styles: "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-200 dark:border-green-500/40",
  },
  {
    name: "Markdown Preview",
    description: "Live preview Markdown output.",
    category: "Developer",
    icon: FileCode,
    href: "/tools/markdown-preview",
    styles: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/40",
  },
  {
    name: "Timestamp Tool",
    description: "Convert Unix timestamps.",
    category: "Utilities",
    icon: Clock,
    href: "/tools/timestamp",
    styles: "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-500/10 dark:text-lime-200 dark:border-lime-500/40",
  },
  {
    name: "SQL Formatter",
    description: "Format SQL with clean structure and keyword highlighting.",
    category: "Developer",
    icon: Database,
    href: "/tools/sql-formatter",
    styles: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-200 dark:border-violet-500/40",
  },
  {
    name: "JSON → TypeScript",
    description: "Convert JSON into TypeScript interfaces.",
    category: "Developer",
    icon: FileJson,
    href: "/tools/json-to-ts",
    styles: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/40",
  },
  {
    name: "Diff Checker",
    description: "Compare two texts and highlight differences.",
    category: "Developer",
    icon: GitCompare,
    href: "/tools/diff-checker",
    styles: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/40",
  },
];

const ToolCard = ({ tool, variant = 'default' }: { tool: Tool; variant?: 'default' | 'popular' }) => {
  const sizeClasses = variant === 'popular' ? 'p-6' : 'p-5';
  const iconClasses = variant === 'popular' ? 'h-11 w-11 text-sm' : 'h-9 w-9 text-xs';

  return (
    <Link
      href={tool.href}
      className={`group relative flex h-full flex-col gap-4 rounded-lg shadow-[2px_2px_6px_0_#ebebec,0_2px_4px_-2px_#ebebec] hover:shadow-[2px_5px_10px_0px_#ebebec,0_4px_6px_-4px_#ebebec] dark:shadow-none  bg-white/90 ${sizeClasses} transition-shadow duration-200 dark:bg-slate-900/60 dark:hover:border-sky-500/40`}
    >
      <span className="absolute left-0 top-4 h-10 w-1 rounded-full bg-sky-100 dark:bg-sky-500/20" />
      <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
        <Badge variant={'outline'} className='text-[0.65rem] opacity-50'>{tool.category}</Badge>
        {tool.isPopular ? <span className="text-sky-600 dark:text-sky-300">Popular</span> : <span>Tool</span>}
      </div>
      <div className="flex items-start gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm border font-semibold uppercase tracking-wide ${tool.styles}`}
        >
          {<tool.icon size={18}/>}
        </span>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{tool.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-end text-xs font-medium text-slate-500 dark:text-slate-400">
        <Button variant={"default"} className='rounded-full group-hover:bg-indigo-700 hover:bg-indigo-800 group-hover:text-white transition-all! bg-surface text-foreground '>Open Tool</Button>
      </div>
    </Link>
  );
};

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('popular');

  const categoryOrder = ['Developer', 'Text', 'Converters', 'Generators', 'Security', 'Utilities'];

  const categoryCounts = useMemo(() => {
    return tools.reduce<Record<string, number>>((acc, tool) => {
      acc[tool.category] = (acc[tool.category] ?? 0) + 1;
      return acc;
    }, {});
  }, []);

  const categories = useMemo(() => {
    const ordered = categoryOrder.filter((category) => categoryCounts[category]);
    return ['All', ...ordered];
  }, [categoryCounts]);

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let filtered = tools.filter((tool) => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (sortMode === 'popular') {
      filtered = filtered.sort((a, b) => Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular)) || a.name.localeCompare(b.name));
    } else {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [activeCategory, searchQuery, sortMode]);

  const popularTools = useMemo(() => tools.filter((tool) => tool.isPopular).slice(0, 3), []);
  const showPopular = activeCategory === 'All' && searchQuery.trim().length === 0;

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-20 pt-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 dark:opacity-15" />
          <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/60 blur-3xl dark:bg-sky-500/10" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
        </div>

        <div className="container-custom relative">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200">
              <Sparkles size={12} />
              New tools added regularly
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Free Online Tools
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300">
              Simple, fast, and privacy-friendly tools for everyday tasks.
            </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-3xl">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                aria-label="Search tools"
                placeholder="Search tools... (JSON, UUID, JWT, Markdown)"
                className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-10 text-sm text-slate-800 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-500/30"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setSearchQuery('');
                  }
                }}
              />
              {searchQuery.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1 text-slate-400 transition hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
              {filteredTools.length} tools shown
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500/60" />
              {tools.length} tools
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/60" />
              {categories.length - 1} categories
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              Updated weekly
            </span>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-y border-slate-200/70 bg-white/90 py-4 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="container-custom flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            Filter by category
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  className={`whitespace-nowrap rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white'
                  }`}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-[0.3em]">Sort</span>
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                className={`rounded-md px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${
                  sortMode === 'popular'
                    ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
                onClick={() => setSortMode('popular')}
              >
                Popular
              </button>
              <button
                type="button"
                className={`rounded-md px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${
                  sortMode === 'name'
                    ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
                onClick={() => setSortMode('name')}
              >
                A-Z
              </button>
            </div>
          </div>
        </div>
      </section>

      {showPopular ? (
        <section className="py-14 bg-zinc-50 dark:bg-[#0b0f1a]">
          <div className="container-custom">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular Tools</h2>
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Handpicked</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} variant="popular" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-10 bg-zinc-50 dark:bg-[#0b0f1a]">
        <div className="container-custom">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">All Tools</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Browse everything</span>
          </div>
          {filteredTools.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
              No tools match your search yet. Try a different keyword or category.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 rounded-lg border border-slate-200/70 bg-white px-8 py-12 md:grid-cols-[1.2fr_0.8fr] dark:border-slate-800 dark:bg-slate-900/60">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300">
                Suggestions
              </span>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Need a specific tool?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                I'm building new tools every week -- share what would make your workflow easier.
              </p>
              <div className="flex flex-wrap gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">Fast turnaround</span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">Privacy first</span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">Always free</span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-lg border border-slate-200/70 bg-slate-50 px-6 py-6 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <p className="font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Examples</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500/60" />
                    File converter for PDF and images
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500/60" />
                    Small calculators for quick checks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500/60" />
                    Text cleanup and formatting tools
                  </li>
                </ul>
              </div>
              <Button asChild className="h-10 rounded-lg bg-sky-600 px-6 text-white hover:bg-sky-500">
                <Link href="/contact">Request a Tool</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/70 py-10 dark:border-slate-800">
        <div className="container-custom flex flex-col items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-slate-400 md:flex-row dark:text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link>
            <Link href="/tools" className="hover:text-slate-900 dark:hover:text-white">Tools</Link>
            <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white">Blog</Link>
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white">Contact</Link>
            <Link href="https://github.com/codingwithasim" target="_blank" className="hover:text-slate-900 dark:hover:text-white">
              GitHub
            </Link>
          </div>
          <span>Built for everyday use</span>
        </div>
      </footer>
    </div>
  );
}
