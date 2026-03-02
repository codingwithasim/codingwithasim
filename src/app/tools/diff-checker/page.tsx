import type { Metadata } from 'next';
import DiffCheckerTool from '@/components/tools/DiffCheckerTool';

export const metadata: Metadata = {
  title: 'Diff Checker (Text Compare) | Toolbox',
  description:
    'Compare two texts line-by-line and word-by-word with clear highlights. Fast, client-side diff checker.',
  keywords: [
    'diff checker',
    'text compare',
    'text diff',
    'string comparison',
    'compare text online',
  ],
  alternates: {
    canonical: '/tools/diff-checker',
  },
  openGraph: {
    title: 'Diff Checker (Text Compare) | Toolbox',
    description:
      'Compare two texts line-by-line and word-by-word with clear highlights. Fast, client-side diff checker.',
    type: 'website',
    url: '/tools/diff-checker',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diff Checker (Text Compare) | Toolbox',
    description:
      'Compare two texts line-by-line and word-by-word with clear highlights. Fast, client-side diff checker.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Diff Checker (Text Compare)',
  description: 'Compare two texts line-by-line and word-by-word with clear highlights.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/diff-checker',
};

export default function DiffCheckerPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DiffCheckerTool />
    </div>
  );
}
