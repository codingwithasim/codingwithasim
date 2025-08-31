import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume - Muhammad Asim',
  description: 'A comprehensive overview of my professional experience, skills, and achievements in web development and software engineering.',
  keywords: ['resume', 'curriculum vitae', 'professional experience', 'technical skills', 'full-stack developer'],
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}