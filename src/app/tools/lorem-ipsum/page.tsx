import type { Metadata } from 'next';
import LoremIpsumTool from '@/components/tools/LoremIpsumTool';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator | Toolbox',
  description:
    'Generate clean lorem ipsum placeholder text in seconds. Create paragraphs, sentences, or words right in your browser.',
  keywords: ['lorem ipsum generator', 'placeholder text', 'lorem ipsum', 'design tools', 'developer utilities'],
  alternates: {
    canonical: '/tools/lorem-ipsum',
  },
  openGraph: {
    title: 'Lorem Ipsum Generator | Toolbox',
    description:
      'Generate clean lorem ipsum placeholder text in seconds. Create paragraphs, sentences, or words right in your browser.',
    type: 'website',
    url: '/tools/lorem-ipsum',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lorem Ipsum Generator | Toolbox',
    description:
      'Generate clean lorem ipsum placeholder text in seconds. Create paragraphs, sentences, or words right in your browser.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Lorem Ipsum Generator',
  description: 'Generate lorem ipsum placeholder text in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/lorem-ipsum',
};

export default function LoremIpsumPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LoremIpsumTool />
    </div>
  );
}
