import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Muhammad Asim',
  description: 'A passionate developer focused on creating exceptional user experiences and building tools that make development easier and more enjoyable.',
  keywords: ['web developer', 'full-stack developer', 'React', 'Node.js', 'developer experience'],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}