'use client';

import React from 'react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  tag: string;
  featured: boolean;
  readTime: string;
}

const WritingPreview = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Performant React Applications',
      summary: 'Learn the key techniques for optimizing React performance, from code splitting to memoization strategies.',
      date: '2024-01-15',
      tag: 'Performance',
      featured: true,
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Modern CSS Grid Layouts',
      summary: 'Explore advanced CSS Grid techniques for creating complex, responsive layouts with minimal code.',
      date: '2024-01-10',
      tag: 'CSS',
      featured: false,
      readTime: '6 min read'
    },
    {
      id: 3,
      title: 'API Design Best Practices',
      summary: 'Design RESTful APIs that developers love to use, with proper error handling and documentation.',
      date: '2024-01-05',
      tag: 'Backend',
      featured: false,
      readTime: '10 min read'
    }
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-24 bg-[#0B0F14]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest <span className="text-[#22C55E]">Writing</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Technical articles, tutorials, and insights about web development, 
            performance optimization, and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            {blogPosts.filter(post => post.featured).map((post) => (
              <div key={post.id} className="card group hover:scale-[1.02] transition-transform duration-300">
                <div className="relative mb-6">
                  <div className="w-full h-64 bg-gradient-to-br from-[#1F2937] to-[#111318] rounded-xl flex items-center justify-center">
                    <div className="text-6xl font-bold text-white/20">📝</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary">Featured</span>
                  </div>
                  <div className="absolute top-4 right-4 text-white/60 text-sm">
                    {post.readTime}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>{formatDate(post.date)}</span>
                    <span className="badge badge-secondary">{post.tag}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#22C55E] transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-white/70 text-lg leading-relaxed">
                    {post.summary}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 font-medium group/link"
                  >
                    Read full article
                    <svg className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Posts */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Posts</h3>
            {blogPosts.filter(post => !post.featured).map((post) => (
              <div key={post.id} className="card group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{formatDate(post.date)}</span>
                    <span className="badge badge-secondary text-xs">{post.tag}</span>
                  </div>

                  <h4 className="font-semibold text-white group-hover:text-[#22C55E] transition-colors duration-200 leading-tight">
                    {post.title}
                  </h4>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs">{post.readTime}</span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 text-sm font-medium"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 text-center">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-white/70 mb-6">
              Get notified when I publish new articles about web development, 
              performance, and developer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#111318] border border-[#1F2937] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#22C55E] transition-colors duration-200"
              />
              <button className="btn-primary px-6 py-3">
                Subscribe
              </button>
            </div>
            <p className="text-white/50 text-xs mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* View All Posts */}
        <div className="text-center mt-12">
          <Link href="/blog" className="btn-secondary text-lg px-8 py-4">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WritingPreview;