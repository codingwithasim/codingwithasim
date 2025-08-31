import React from 'react';

interface GitHubStat {
  metric: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

interface Project {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

const OpenSource = () => {
  const githubStats: GitHubStat[] = [
    {
      metric: 'Stars',
      value: '2.4k+',
      description: 'GitHub stars across projects',
      icon: '⭐',
      color: 'text-yellow-400'
    },
    {
      metric: 'Contributions',
      value: '1.2k+',
      description: 'Commits this year',
      icon: '📊',
      color: 'text-[#22C55E]'
    },
    {
      metric: 'Repositories',
      value: '45+',
      description: 'Open source projects',
      icon: '📁',
      color: 'text-[#14B8A6]'
    },
    {
      metric: 'Forks',
      value: '850+',
      description: 'Project forks',
      icon: '🔀',
      color: 'text-[#8B5CF6]'
    }
  ];

  const topProjects: Project[] = [
    {
      name: 'react-performance-hooks',
      description: 'Collection of React hooks for performance optimization',
      stars: 450,
      language: 'TypeScript',
      url: 'https://github.com'
    },
    {
      name: 'dev-toolkit',
      description: 'Essential tools for modern web development',
      stars: 320,
      language: 'JavaScript',
      url: 'https://github.com'
    },
    {
      name: 'api-gateway',
      description: 'Lightweight API gateway with authentication',
      stars: 280,
      language: 'Go',
      url: 'https://github.com'
    }
  ];

  return (
    <section className="py-24 bg-[#0F1115]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Open <span className="text-[#22C55E]">Source</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Contributing to the developer community through open source projects, 
            tools, and libraries that make development easier.
          </p>
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {githubStats.map((stat, index) => (
            <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className={`text-4xl mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 font-medium mb-2">
                {stat.metric}
              </div>
              <div className="text-white/60 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Top Projects */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topProjects.map((project, index) => (
              <div key={index} className="card group">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white group-hover:text-[#22C55E] transition-colors duration-200">
                    {project.name}
                  </h4>
                  <span className="badge badge-primary text-xs">
                    {project.language}
                  </span>
                </div>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <span>⭐</span>
                    <span>{project.stars}</span>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 text-sm font-medium"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributions Graph Placeholder */}
        <div className="text-center">
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6">
              GitHub Contributions
            </h3>
            <div className="bg-[#111318] border border-[#1F2937] rounded-lg p-8">
              <div className="grid grid-cols-53 gap-1 mb-4">
                {/* Generate 365 days of contributions */}
                {Array.from({ length: 365 }, (_, i) => {
                  const intensity = Math.floor(Math.random() * 5);
                  const colors = [
                    'bg-[#0F1115]', // No contributions
                    'bg-[#1F2937]', // Low
                    'bg-[#374151]', // Medium
                    'bg-[#22C55E]/60', // High
                    'bg-[#22C55E]' // Very high
                  ];
                  return (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${colors[intensity]} border border-[#1F2937]/20`}
                      title={`${Math.floor(Math.random() * 10)} contributions on day ${i + 1}`}
                    ></div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm text-white/60">
                <span>Less</span>
                <div className="flex space-x-1">
                  {['bg-[#0F1115]', 'bg-[#1F2937]', 'bg-[#374151]', 'bg-[#22C55E]/60', 'bg-[#22C55E]'].map((color, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${color} border border-[#1F2937]/20`}></div>
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>View GitHub Profile</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;