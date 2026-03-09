import type { Metadata } from 'next';
import UrlEncoderTool from '@/components/tools/UrlEncoderTool';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder | Toolbox',
  description:
    'Encode or decode URL components instantly in your browser. Fast, client-side URL encoder/decoder for text.',
  keywords: [
    'url encoder',
    'url decoder',
    'percent encode',
    'percent decode',
    'encode url',
    'decode url',
    'query string tool',
  ],
  alternates: {
    canonical: '/tools/url-encoder',
  },
  openGraph: {
    title: 'URL Encoder / Decoder | Toolbox',
    description:
      'Encode or decode URL components instantly in your browser. Fast, client-side URL encoder/decoder for text.',
    type: 'website',
    url: '/tools/url-encoder',
    images: ['/assets/og_tools.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder / Decoder | Toolbox',
    description:
      'Encode or decode URL components instantly in your browser. Fast, client-side URL encoder/decoder for text.',
    images: ['/assets/og_tools.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'URL Encoder / Decoder',
  description: 'Encode or decode URL components instantly in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/url-encoder',
};

export default function UrlEncoderPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UrlEncoderTool />
    </div>
  );
}
