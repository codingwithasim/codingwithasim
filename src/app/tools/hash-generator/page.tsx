import type { Metadata } from 'next';
import HashGeneratorTool from '@/components/tools/HashGeneratorTool';

export const metadata: Metadata = {
  title: 'Hash Generator (MD5, SHA-1, SHA-256, SHA-384, SHA-512) | Toolbox',
  description:
    'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your browser. Fast, client-side hash generator for text.',
  keywords: [
    'hash generator',
    'md5 generator',
    'sha1 generator',
    'sha256 generator',
    'checksum tool',
    'hash text',
    'security tool',
  ],
  alternates: {
    canonical: '/tools/hash-generator',
  },
  openGraph: {
    title: 'Hash Generator (MD5, SHA-1, SHA-256, SHA-384, SHA-512) | Toolbox',
    description:
      'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your browser. Fast, client-side hash generator for text.',
    type: 'website',
    url: '/tools/hash-generator',
    images: ['/assets/og_tools.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hash Generator (MD5, SHA-1, SHA-256, SHA-384, SHA-512) | Toolbox',
    description:
      'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your browser. Fast, client-side hash generator for text.',
    images: ['/assets/og_tools.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Hash Generator',
  description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/hash-generator',
};

export default function HashGeneratorPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HashGeneratorTool />
    </div>
  );
}
