
export default function Uses() {
  const categories = [
    {
      name: 'Development Environment',
      items: [
        { name: 'VS Code', description: 'Primary code editor with custom extensions', icon: '💻' },
        { name: 'iTerm2', description: 'Terminal emulator for macOS', icon: '🖥️' },
        { name: 'Oh My Zsh', description: 'Framework for managing Zsh configuration', icon: '⚡' },
        { name: 'Git', description: 'Version control system', icon: '📝' }
      ]
    },
    {
      name: 'Frontend Development',
      items: [
        { name: 'React', description: 'JavaScript library for building user interfaces', icon: '⚛️' },
        { name: 'TypeScript', description: 'Typed superset of JavaScript', icon: '🔷' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: '🎨' },
        { name: 'Vite', description: 'Build tool and dev server', icon: '🚀' }
      ]
    },
    {
      name: 'Backend Development',
      items: [
        { name: 'Node.js', description: 'JavaScript runtime for server-side development', icon: '🟢' },
        { name: 'Python', description: 'Programming language for backend services', icon: '🐍' },
        { name: 'PostgreSQL', description: 'Relational database management system', icon: '🐘' },
        { name: 'Redis', description: 'In-memory data structure store', icon: '🔴' }
      ]
    },
    {
      name: 'DevOps & Tools',
      items: [
        { name: 'Docker', description: 'Containerization platform', icon: '🐳' },
        { name: 'GitHub Actions', description: 'CI/CD automation platform', icon: '🔄' },
        { name: 'AWS', description: 'Cloud computing platform', icon: '☁️' },
        { name: 'Vercel', description: 'Deployment platform for frontend apps', icon: '▲' }
      ]
    },
    {
      name: 'Productivity',
      items: [
        { name: 'Notion', description: 'All-in-one workspace for notes and docs', icon: '📓' },
        { name: 'Linear', description: 'Issue tracking and project management', icon: '📋' },
        { name: 'Figma', description: 'Design and prototyping tool', icon: '🎯' },
        { name: 'Slack', description: 'Team communication platform', icon: '💬' }
      ]
    },
    {
      name: 'Hardware',
      items: [
        { name: 'MacBook Pro M2', description: 'Primary development machine', icon: '💻' },
        { name: 'Dual 27" Monitors', description: 'Extended workspace setup', icon: '🖥️' },
        { name: 'Mechanical Keyboard', description: 'Custom mechanical keyboard', icon: '⌨️' },
        { name: 'Wireless Mouse', description: 'Logitech MX Master 3', icon: '🖱️' }
      ]
    }
  ];

  const currentLearning = [
    'Rust programming language',
    'WebAssembly (WASM)',
    'Machine Learning fundamentals',
    'GraphQL advanced concepts',
    'Kubernetes orchestration'
  ];

  const developmentWorkflow = [
    'Plan and design architecture',
    'Set up development environment',
    'Write tests first (TDD approach)',
    'Implement features iteratively',
    'Code review and refactoring',
    'Performance testing and optimization',
    'Documentation and deployment'
  ];

  const vsCodeSetup = [
    'ESLint for code quality',
    'Prettier for code formatting',
    'GitLens for Git integration',
    'Auto Rename Tag for HTML/JSX',
    'Bracket Pair Colorizer',
    'Material Icon Theme',
    'One Dark Pro theme'
  ];

  const terminalSetup = [
    'Oh My Zsh with custom theme',
    'Zsh syntax highlighting',
    'Zsh autosuggestions',
    'Custom aliases for common commands',
    'Git status in prompt',
    'Node version management (nvm)',
    'Python virtual environments'
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h4 className="text-xl text-dark-400 max-w-3xl mx-auto leading-relaxed">
              A list of <span className='text-white font-medium'>tools & technologies</span> I use 
              for <span className='text-white font-medium'>development, productivity, and daily work</span>.
            </h4>
          </div>
        </div>
      </section>

      <div className="container-custom pb-24">
        {/* Tools Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="card">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <span className="mr-3">{category.items[0]?.icon}</span>
                  {category.name}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <h4 className="font-medium text-white">{item.name}</h4>
                      </div>
                      <p className="text-white/60 text-sm ml-8 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Learning */}
        <section className="mb-20">
          <div className="card max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Currently Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLearning.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Workflow */}
        <section className="mb-20">
          <div className="card max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Development Workflow
            </h2>
            <div className="space-y-4">
              {developmentWorkflow.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-white/80 pt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VS Code Setup */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-6">VS Code Setup</h3>
              <div className="space-y-3">
                {vsCodeSetup.map((extension, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#14B8A6] rounded-full"></div>
                    <span className="text-white/80 text-sm">{extension}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-6">Terminal Setup</h3>
              <div className="space-y-3">
                {terminalSetup.map((setup, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                    <span className="text-white/80 text-sm">{setup}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Want to know more?
            </h2>
            <p className="text-white/70 mb-6">
              Have questions about my setup or want to discuss specific tools? 
              I'm always happy to share insights and recommendations.
            </p>
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}