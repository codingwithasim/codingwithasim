import type { Metadata } from 'next';
import RegexTesterTool from '@/components/tools/RegexTesterTool';

export const metadata: Metadata = {
  title: 'Regex Tester | Toolbox',
  description:
    'Test regular expressions against text instantly. Highlight matches, inspect groups, and copy results in your browser.',
  keywords: ['regex tester', 'regular expression', 'regex tool', 'pattern tester', 'developer utilities'],
  alternates: {
    canonical: '/tools/regex-tester',
  },
  openGraph: {
    title: 'Regex Tester | Toolbox',
    description:
      'Test regular expressions against text instantly. Highlight matches, inspect groups, and copy results in your browser.',
    type: 'website',
    url: '/tools/regex-tester',
    images: ['/assets/og_image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regex Tester | Toolbox',
    description:
      'Test regular expressions against text instantly. Highlight matches, inspect groups, and copy results in your browser.',
    images: ['/assets/og_image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Regex Tester',
  description: 'Test regular expressions against text instantly in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/regex-tester',
};

export default function RegexTesterPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RegexTesterTool />
    </div>
  );
}
