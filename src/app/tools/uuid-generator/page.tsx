import type { Metadata } from 'next';
import UuidGeneratorTool from '@/components/tools/UuidGeneratorTool';

export const metadata: Metadata = {
  title: 'UUID Generator | Toolbox',
  description:
    'Generate UUID v4 identifiers instantly in your browser. Copy, download, and format UUIDs with zero backend calls.',
  keywords: ['uuid generator', 'uuid v4', 'random uuid', 'uuid tool', 'developer utilities'],
  alternates: {
    canonical: '/tools/uuid-generator',
  },
  openGraph: {
    title: 'UUID Generator | Toolbox',
    description:
      'Generate UUID v4 identifiers instantly in your browser. Copy, download, and format UUIDs with zero backend calls.',
    type: 'website',
    url: '/tools/uuid-generator',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UUID Generator | Toolbox',
    description:
      'Generate UUID v4 identifiers instantly in your browser. Copy, download, and format UUIDs with zero backend calls.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UUID Generator',
  description: 'Generate UUID v4 identifiers instantly in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/uuid-generator',
};

export default function UuidGeneratorPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UuidGeneratorTool />
    </div>
  );
}
