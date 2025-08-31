import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Muhammad Asim',
  description: 'Technical articles, tutorials and insights on web development, performance optimization and developer experience.',
  keywords: ['blog', 'technical articles', 'web development', 'tutorials', 'web performance'],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}