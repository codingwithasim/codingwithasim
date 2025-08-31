'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Nexusflow',
      description: 'A modern, responsive React landing page for NexusFlow - a fictional team collaboration and workflow automation platform. Built with React, Tailwind CSS, and Framer Motion.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      type: 'web app',
      tech: 'React',
      metrics: {
        users: '10k+',
        performance: '99.9%',
        revenue: '$2M+'
      },
      link: '/projects/ecommerce-platform'
    },
    {
      id: 2,
      title: 'Developer Dashboard',
      description: 'Analytics dashboard that reduced development time by 40% for engineering teams.',
      image: '/api/placeholder/400/250',
      tags: ['Vue.js', 'Python', 'MongoDB', 'Docker'],
      type: 'web app',
      tech: 'Vue.js',
      metrics: {
        users: '500+',
        performance: '40%',
        efficiency: 'High'
      },
      link: '/projects/developer-dashboard'
    },
    {
      id: 3,
      title: 'Mobile App Backend',
      description: 'Scaled backend infrastructure supporting 50k+ mobile app users with real-time features.',
      image: '/api/placeholder/400/250',
      tags: ['Go', 'gRPC', 'Kubernetes', 'Elasticsearch'],
      type: 'backend',
      tech: 'Go',
      metrics: {
        users: '50k+',
        performance: '99.5%',
        scale: 'High'
      },
      link: '/projects/mobile-backend'
    },
    {
      id: 4,
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool that increased content production by 300%.',
      image: '/api/placeholder/400/250',
      tags: ['Python', 'TensorFlow', 'React', 'AWS'],
      type: 'web app',
      tech: 'Python',
      metrics: {
        users: '1k+',
        performance: '300%',
        accuracy: '95%'
      },
      link: '/projects/ai-content-generator'
    },
    {
      id: 5,
      title: 'Real-time Chat System',
      description: 'Scalable real-time chat system supporting 100k+ concurrent connections.',
      image: '/api/placeholder/400/250',
      tags: ['WebSocket', 'Node.js', 'Redis', 'Socket.io'],
      type: 'backend',
      tech: 'Node.js',
      metrics: {
        users: '100k+',
        performance: 'Real-time',
        reliability: '99.9%'
      },
      link: '/projects/chat-system'
    },
    {
      id: 6,
      title: 'Data Visualization Tool',
      description: 'Interactive data visualization platform processing millions of data points.',
      image: '/api/placeholder/400/250',
      tags: ['D3.js', 'React', 'Python', 'PostgreSQL'],
      type: 'web app',
      tech: 'React',
      metrics: {
        users: '2k+',
        performance: 'Fast',
        data: 'Millions'
      },
      link: '/projects/data-viz-tool'
    },
    {
      id: 7,
      title: 'CLI Development Tool',
      description: 'Command-line interface tool for automating development workflows.',
      image: '/api/placeholder/400/250',
      tags: ['Node.js', 'CLI', 'Automation', 'NPM'],
      type: 'library',
      tech: 'Node.js',
      metrics: {
        downloads: '50k+',
        stars: '200+',
        forks: '50+'
      },
      link: '/projects/cli-tool'
    },
    {
      id: 8,
      title: 'Performance Monitoring',
      description: 'Real-time performance monitoring dashboard for web applications.',
      image: '/api/placeholder/400/250',
      tags: ['React', 'WebSocket', 'Charts', 'Performance'],
      type: 'web app',
      tech: 'React',
      metrics: {
        users: '800+',
        performance: 'Real-time',
        accuracy: '99.8%'
      },
      link: '/projects/performance-monitoring'
    }
  ];

  const technologies = ['all', 'React', 'Vue.js', 'Node.js', 'Python', 'Go'];
  const types = ['all', 'web app', 'backend', 'library'];

  const filteredProjects = projects.filter(project => {
    const techMatch = selectedTech === 'all' || project.tech === selectedTech;
    const typeMatch = selectedType === 'all' || project.type === selectedType;
    return techMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="text-[#22C55E]">Projects</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A collection of projects showcasing my expertise in building scalable web applications, 
              backend systems, and developer tools. Each project focuses on performance, 
              user experience, and clean code architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Technology Filter */}
            <div className="flex flex-wrap gap-3">
              <span className="text-white/60 text-sm font-medium">Tech:</span>
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTech === tech
                      ? 'bg-[#22C55E] text-black'
                      : 'bg-[#111318] text-white/70 hover:bg-[#1F2937] hover:text-white'
                  }`}
                >
                  {tech === 'all' ? 'All' : tech}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-3">
              <span className="text-white/60 text-sm font-medium">Type:</span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedType === type
                      ? 'bg-[#14B8A6] text-black'
                      : 'bg-[#111318] text-white/70 hover:bg-[#1F2937] hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All' : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container-custom">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group">
                  <div className="card h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative mb-6 overflow-hidden rounded-xl">
                      <div className="w-full h-48 bg-gradient-to-br from-[#1F2937] to-[#111318] flex items-center justify-center">
                        <div className="text-4xl font-bold text-white/20">📱</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Project Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#22C55E] transition-colors duration-200">
                          {project.title}
                        </h3>
                        <span className="badge badge-secondary text-xs capitalize">
                          {project.type}
                        </span>
                      </div>
                      
                      <p className="text-white/70 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="badge badge-primary text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Quick Metrics */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-[#22C55E] font-semibold">{value}</div>
                            <div className="text-white/50 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Project Link */}
                    <div className="pt-4 mt-auto">
                      <Link
                        href={project.link}
                        className="inline-flex items-center text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 text-sm font-medium group/link"
                      >
                        View project
                        <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No projects found</h3>
              <p className="text-white/60 mb-8">
                Try adjusting your filters to see more projects.
              </p>
              <button
                onClick={() => {
                  setSelectedTech('all');
                  setSelectedType('all');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}