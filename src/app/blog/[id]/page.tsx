import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Article de Blog - Muhammad Asim',
  description: 'Contenu d\'article avec des explications détaillées, des exemples de code et des meilleures pratiques.',
  keywords: ['article blog', 'développement web', 'tutoriel', 'guide technique'],
};

interface BlogPostProps {
  params: { id: string };
}

export default function BlogPost({ params }: BlogPostProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog <span className="text-[#22C55E]">Post</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Article content for blog post ID: {id}
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder Content */}
      <div className="container-custom pb-24">
        <div className="card max-w-4xl mx-auto">
          <div className="space-y-8 p-12">
            <div className="text-6xl mb-6 text-center">📝</div>
            <h2 className="text-2xl font-bold text-white text-center">
              Blog Post Coming Soon
            </h2>
            <p className="text-white/70 leading-relaxed text-center">
              This blog post is currently being written. It will include:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Content Structure</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Introduction & overview</li>
                  <li>• Detailed explanations</li>
                  <li>• Code examples</li>
                  <li>• Best practices</li>
                  <li>• Conclusion & takeaways</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Features</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Syntax highlighted code</li>
                  <li>• Interactive examples</li>
                  <li>• Table of contents</li>
                  <li>• Related articles</li>
                  <li>• Social sharing</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 text-center">
              <Link href="/blog" className="btn-secondary">
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}