'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Building Performant React Applications',
      summary: 'Learn the key techniques for optimizing React performance, from code splitting to memoization strategies.',
      date: '2024-01-15',
      tag: 'Performance',
      featured: true,
      readTime: '8 min read',
      excerpt: 'Performance optimization in React is crucial for delivering smooth user experiences. In this comprehensive guide, we\'ll explore various techniques including code splitting, memoization, and bundle optimization...'
    },
    {
      id: 2,
      title: 'Modern CSS Grid Layouts',
      summary: 'Explore advanced CSS Grid techniques for creating complex, responsive layouts with minimal code.',
      date: '2024-01-10',
      tag: 'CSS',
      featured: false,
      readTime: '6 min read',
      excerpt: 'CSS Grid has revolutionized how we approach layout design. This article covers advanced techniques for creating complex, responsive layouts that work seamlessly across all devices...'
    },
    {
      id: 3,
      title: 'API Design Best Practices',
      summary: 'Design RESTful APIs that developers love to use, with proper error handling and documentation.',
      date: '2024-01-05',
      tag: 'Backend',
      featured: false,
      readTime: '10 min read',
      excerpt: 'Good API design is crucial for developer experience and system maintainability. Learn the best practices for designing RESTful APIs that are intuitive, well-documented, and easy to integrate...'
    },
    {
      id: 4,
      title: 'State Management in Modern React',
      summary: 'Comparing different state management solutions and when to use each approach.',
      date: '2024-01-01',
      tag: 'React',
      featured: false,
      readTime: '12 min read',
      excerpt: 'With the introduction of hooks and context, React state management has evolved significantly. This guide compares different approaches and helps you choose the right solution...'
    },
    {
      id: 5,
      title: 'Web Performance Metrics That Matter',
      summary: 'Understanding Core Web Vitals and other performance metrics that impact user experience.',
      date: '2023-12-28',
      tag: 'Performance',
      featured: false,
      readTime: '9 min read',
      excerpt: 'Performance metrics are essential for understanding user experience. This article covers Core Web Vitals, how to measure them, and strategies for improvement...'
    },
    {
      id: 6,
      title: 'TypeScript Tips and Tricks',
      summary: 'Advanced TypeScript patterns and techniques for better type safety and developer experience.',
      date: '2023-12-25',
      tag: 'TypeScript',
      featured: false,
      readTime: '7 min read',
      excerpt: 'TypeScript offers powerful features that can significantly improve code quality. Discover advanced patterns and techniques that will make your code more robust...'
    }
  ];

  const tags = ['all', 'React', 'Performance', 'CSS', 'Backend', 'TypeScript'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="text-[#22C55E]">Writing</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Technical articles, tutorials, and insights about web development, 
              performance optimization, and developer experience.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom pb-24">
        {/* Search and Filters */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-[#111318] border border-[#1F2937] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#22C55E] transition-colors duration-200"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-[#22C55E] text-black'
                      : 'bg-[#111318] text-white/70 hover:bg-[#1F2937] hover:text-white'
                  }`}
                >
                  {tag === 'all' ? 'All' : tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
            <div className="card group hover:scale-[1.02] transition-transform duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="w-full h-64 lg:h-full bg-gradient-to-br from-[#1F2937] to-[#111318] rounded-xl flex items-center justify-center">
                    <div className="text-6xl font-bold text-white/20">📝</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary">Featured</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>{formatDate(featuredPost.date)}</span>
                    <span className="badge badge-secondary">{featuredPost.tag}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#22C55E] transition-colors duration-200">
                    {featuredPost.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 font-medium group/link"
                  >
                    Read full article
                    <svg className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div key={post.id} className="card group hover:scale-[1.02] transition-transform duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">{formatDate(post.date)}</span>
                      <span className="badge badge-secondary text-xs">{post.tag}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-white group-hover:text-[#22C55E] transition-colors duration-200 leading-tight">
                      {post.title}
                    </h3>

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
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No articles found</h3>
              <p className="text-white/60 mb-8">
                Try adjusting your search or filters to see more articles.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('all');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mb-20">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Stay Updated
            </h2>
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
        </section>
      </div>
    </div>
  );
}