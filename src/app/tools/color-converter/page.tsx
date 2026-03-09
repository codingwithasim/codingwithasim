import type { Metadata } from 'next';
import ColorConverterTool from '@/components/tools/ColorConverterTool';

export const metadata: Metadata = {
  title: 'Color Converter (HEX, RGB, HSL) | Toolbox',
  description:
    'Convert between HEX, RGB, and HSL instantly in your browser. Fast, client-side color converter.',
  keywords: [
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hsl to hex',
    'hex to hsl',
    'rgb to hsl',
    'hsl to rgb',
  ],
  alternates: {
    canonical: '/tools/color-converter',
  },
  openGraph: {
    title: 'Color Converter (HEX, RGB, HSL) | Toolbox',
    description:
      'Convert between HEX, RGB, and HSL instantly in your browser. Fast, client-side color converter.',
    type: 'website',
    url: '/tools/color-converter',
    images: ['/assets/og_tools.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Converter (HEX, RGB, HSL) | Toolbox',
    description:
      'Convert between HEX, RGB, and HSL instantly in your browser. Fast, client-side color converter.',
    images: ['/assets/og_tools.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Color Converter',
  description: 'Convert between HEX, RGB, and HSL instantly in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/color-converter',
};

export default function ColorConverterPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ColorConverterTool />
    </div>
  );
}
