import type { Metadata } from 'next';
import CurlToFetchTool from '@/components/tools/CurlToFetchTool';

export const metadata: Metadata = {
  title: 'Curl → Fetch Converter | Toolbox',
  description:
    'Convert curl commands into browser-ready fetch snippets instantly. Fast, client-side curl to fetch converter.',
  keywords: [
    'curl to fetch',
    'curl converter',
    'fetch generator',
    'http tools',
    'api tools',
  ],
  alternates: {
    canonical: '/tools/curl-to-fetch',
  },
  openGraph: {
    title: 'Curl → Fetch Converter | Toolbox',
    description:
      'Convert curl commands into browser-ready fetch snippets instantly. Fast, client-side curl to fetch converter.',
    type: 'website',
    url: '/tools/curl-to-fetch',
    images: ['/assets/og_tools.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curl → Fetch Converter | Toolbox',
    description:
      'Convert curl commands into browser-ready fetch snippets instantly. Fast, client-side curl to fetch converter.',
    images: ['/assets/og_tools.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Curl → Fetch Converter',
  description: 'Convert curl commands into browser-ready fetch snippets instantly.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/curl-to-fetch',
};

export default function CurlToFetchPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CurlToFetchTool />
    </div>
  );
}
