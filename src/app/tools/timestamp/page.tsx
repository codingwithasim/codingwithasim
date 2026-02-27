import type { Metadata } from 'next';
import TimestampTool from '@/components/tools/TimestampTool';

export const metadata: Metadata = {
  title: 'Timestamp Converter | Toolbox',
  description:
    'Convert Unix timestamps to readable dates and back. Switch between seconds and milliseconds instantly in your browser.',
  keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'time converter', 'developer utilities'],
  alternates: {
    canonical: '/tools/timestamp',
  },
  openGraph: {
    title: 'Timestamp Converter | Toolbox',
    description:
      'Convert Unix timestamps to readable dates and back. Switch between seconds and milliseconds instantly in your browser.',
    type: 'website',
    url: '/tools/timestamp',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timestamp Converter | Toolbox',
    description:
      'Convert Unix timestamps to readable dates and back. Switch between seconds and milliseconds instantly in your browser.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Timestamp Converter',
  description: 'Convert Unix timestamps to readable dates and back.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/timestamp',
};

export default function TimestampPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TimestampTool />
    </div>
  );
}
