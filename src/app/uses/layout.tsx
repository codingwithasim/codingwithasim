import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uses - Muhammad Asim',
  description: 'A comprehensive list of tools, technologies, and setup that I use for development, productivity, and daily work.',
  keywords: ['development tools', 'technologies', 'dev environment', 'configuration', 'tech stack'],
};

export default function UsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}