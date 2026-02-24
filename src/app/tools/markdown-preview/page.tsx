import type { Metadata } from 'next';
import MarkdownPreviewTool from '@/components/tools/MarkdownPreviewTool';

export const metadata: Metadata = {
  title: 'Markdown Preview | Toolbox',
  description:
    'Preview Markdown live in your browser. Write, edit, and instantly see formatted output with zero backend calls.',
  keywords: ['markdown preview', 'markdown editor', 'markdown tool', 'developer utilities', 'live preview'],
  alternates: {
    canonical: '/tools/markdown-preview',
  },
  openGraph: {
    title: 'Markdown Preview | Toolbox',
    description:
      'Preview Markdown live in your browser. Write, edit, and instantly see formatted output with zero backend calls.',
    type: 'website',
    url: '/tools/markdown-preview',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Preview | Toolbox',
    description:
      'Preview Markdown live in your browser. Write, edit, and instantly see formatted output with zero backend calls.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Markdown Preview',
  description: 'Preview Markdown live in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/markdown-preview',
};

export default function MarkdownPreviewPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarkdownPreviewTool />
    </div>
  );
}
