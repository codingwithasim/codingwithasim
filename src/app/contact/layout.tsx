import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Muhammad Asim',
  description: 'Ready to start a project or just want to discuss technology? I\'m always open to new opportunities and collaborations.',
  keywords: ['contact', 'collaboration', 'projects', 'web development', 'freelance'],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}