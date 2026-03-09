import type { Metadata } from 'next';
import ApiTesterTool from '@/components/tools/ApiTesterTool';

export const metadata: Metadata = {
  title: 'API Tester | Toolbox',
  description:
    'Test REST APIs in your browser with headers, params, and JSON bodies. Inspect status, headers, and response data instantly.',
  keywords: ['api tester', 'rest api', 'http client', 'postman alternative', 'developer utilities'],
  alternates: {
    canonical: '/tools/api-tester',
  },
  openGraph: {
    title: 'API Tester | Toolbox',
    description:
      'Test REST APIs in your browser with headers, params, and JSON bodies. Inspect status, headers, and response data instantly.',
    type: 'website',
    url: '/tools/api-tester',
    images: ['/assets/og_tools.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Tester | Toolbox',
    description:
      'Test REST APIs in your browser with headers, params, and JSON bodies. Inspect status, headers, and response data instantly.',
    images: ['/assets/og_tools.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'API Tester',
  description: 'Test REST APIs in your browser with headers, params, and JSON bodies.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://codingwithasim.site/tools/api-tester',
};

export default function ApiTesterPage() {
  return (
    <div className="container-custom py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ApiTesterTool />
    </div>
  );
}
