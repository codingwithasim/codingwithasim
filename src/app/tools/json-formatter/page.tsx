import type { Metadata } from 'next';
import JsonFormatterTool from '@/components/tools/JsonFormatterTool';

export const metadata: Metadata = {
  title: 'JSON Formatter | Toolbox',
  description:
    'Format, validate, and minify JSON in your browser. Free JSON formatter with copy, download, and example data.',
  keywords: [
    'json formatter',
    'json validator',
    'json minifier',
    'json beautifier',
    'online json tool',
    'format json',
    'validate json',
  ],
  alternates: {
    canonical: '/tools/json-formatter',
  },
  openGraph: {
    title: 'JSON Formatter | Toolbox',
    description:
      'Format, validate, and minify JSON in your browser. Free JSON formatter with copy, download, and example data.',
    type: 'website',
    url: '/tools/json-formatter',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter | Toolbox',
    description:
      'Format, validate, and minify JSON in your browser. Free JSON formatter with copy, download, and example data.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Formatter',
  description: 'Format, validate, and minify JSON in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/json-formatter',
};

export default function JsonFormatterPage() {
  return (
    <div className="container-custom py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonFormatterTool />
    </div>
  );
}
