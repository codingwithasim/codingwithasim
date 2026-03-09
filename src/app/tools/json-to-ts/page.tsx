import type { Metadata } from 'next';
import JsonToTsTool from '@/components/tools/JsonToTsTool';

export const metadata: Metadata = {
  title: 'JSON → TypeScript Interface Generator | Toolbox',
  description:
    'Convert JSON into TypeScript interfaces instantly. Fast, client-side JSON to TS generator with syntax highlighting.',
  keywords: [
    'json to typescript',
    'json to ts',
    'typescript interface generator',
    'json interface',
    'ts types generator',
  ],
  alternates: {
    canonical: '/tools/json-to-ts',
  },
  openGraph: {
    title: 'JSON → TypeScript Interface Generator | Toolbox',
    description:
      'Convert JSON into TypeScript interfaces instantly. Fast, client-side JSON to TS generator with syntax highlighting.',
    type: 'website',
    url: '/tools/json-to-ts',
    images: ['/assets/og_tools.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON → TypeScript Interface Generator | Toolbox',
    description:
      'Convert JSON into TypeScript interfaces instantly. Fast, client-side JSON to TS generator with syntax highlighting.',
    images: ['/assets/og_tools.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON → TypeScript Interface Generator',
  description: 'Convert JSON into TypeScript interfaces instantly.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/json-to-ts',
};

export default function JsonToTsPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JsonToTsTool />
    </div>
  );
}
