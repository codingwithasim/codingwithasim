import type { Metadata } from 'next';
import SqlFormatterTool from '@/components/tools/SqlFormatterTool';

export const metadata: Metadata = {
  title: 'SQL Formatter | Toolbox',
  description:
    'Format SQL queries with readable structure and keyword highlighting. Fast, client-side SQL formatter.',
  keywords: [
    'sql formatter',
    'format sql',
    'sql beautifier',
    'sql pretty print',
    'sql highlight',
    'database tools',
  ],
  alternates: {
    canonical: '/tools/sql-formatter',
  },
  openGraph: {
    title: 'SQL Formatter | Toolbox',
    description:
      'Format SQL queries with readable structure and keyword highlighting. Fast, client-side SQL formatter.',
    type: 'website',
    url: '/tools/sql-formatter',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL Formatter | Toolbox',
    description:
      'Format SQL queries with readable structure and keyword highlighting. Fast, client-side SQL formatter.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SQL Formatter',
  description: 'Format SQL queries with readable structure and keyword highlighting.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/sql-formatter',
};

export default function SqlFormatterPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SqlFormatterTool />
    </div>
  );
}
