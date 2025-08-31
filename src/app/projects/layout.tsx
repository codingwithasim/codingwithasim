import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Muhammad Asim',
  description: 'A collection of projects showcasing my expertise in building scalable web applications, backend systems, and developer tools.',
  keywords: ['projects', 'web development', 'React applications', 'backend', 'developer portfolio'],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}