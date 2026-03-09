import type { Metadata } from 'next';
import JwtDecoderTool from '@/components/tools/JwtDecoderTool';

export const metadata: Metadata = {
  title: 'JWT Decoder | Toolbox',
  description:
    'Decode JSON Web Tokens in your browser. Inspect headers, payloads, and claims instantly with no backend calls.',
  keywords: ['jwt decoder', 'json web token', 'jwt tool', 'token decoder', 'developer utilities'],
  alternates: {
    canonical: '/tools/jwt-decoder',
  },
  openGraph: {
    title: 'JWT Decoder | Toolbox',
    description:
      'Decode JSON Web Tokens in your browser. Inspect headers, payloads, and claims instantly with no backend calls.',
    type: 'website',
    url: '/tools/jwt-decoder',
    images: ['/assets/og_tools.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JWT Decoder | Toolbox',
    description:
      'Decode JSON Web Tokens in your browser. Inspect headers, payloads, and claims instantly with no backend calls.',
    images: ['/assets/og_tools.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JWT Decoder',
  description: 'Decode JSON Web Tokens in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/jwt-decoder',
};

export default function JwtDecoderPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JwtDecoderTool />
    </div>
  );
}
