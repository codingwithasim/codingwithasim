
export default function About() {
  const experience = [
    {
      year: '2023 - Present',
      company: 'Freelance Developer',
      role: 'Full-Stack Developer',
      description: 'Building scalable web applications and developer tools for clients worldwide.',
      achievements: ['Reduced build times by 48%', 'Improved Core Web Vitals by 35%', 'Delivered 12+ projects']
    },
    {
      year: '2021 - 2023',
      company: 'TechCorp',
      role: 'Senior Frontend Developer',
      description: 'Led frontend development for enterprise applications serving 100k+ users.',
      achievements: ['Led team of 5 developers', 'Implemented performance monitoring', 'Reduced bundle size by 40%']
    },
    {
      year: '2019 - 2021',
      company: 'StartupXYZ',
      role: 'Full-Stack Developer',
      description: 'Built and scaled web applications from MVP to production.',
      achievements: ['Built 3 core products', 'Improved API response time by 60%', 'Implemented CI/CD pipeline']
    }
  ];

  const interests = [
    'Open Source Development',
    'Performance Optimization',
    'Developer Experience',
    'Web Standards',
    'System Architecture',
    'Machine Learning'
  ];

  const currentFocus = [
    'Building developer tools',
    'Performance optimization',
    'Open source contributions',
    'Technical writing',
    'Learning Rust and WebAssembly'
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-[#22C55E]">Me</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A passionate developer focused on creating exceptional user experiences 
              and building tools that make development easier and more enjoyable.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom pb-24">
        {/* Bio Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-white">Who I Am</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  I'm Muhammad Asim, a web developer with over 5 years of experience 
                  building applications that developers actually want to use. My journey 
                  in tech started with curiosity about how things work on the web, and 
                  it's evolved into a passion for creating exceptional developer experiences.
                </p>
                <p>
                  I believe that great software comes from understanding both the technical 
                  requirements and the human needs behind them. Every line of code I write 
                  is crafted with performance, maintainability, and user experience in mind.
                </p>
                <p>
                  When I'm not coding, you'll find me contributing to open source projects, 
                  writing technical articles, or exploring new technologies that push the 
                  boundaries of what's possible on the web.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Experience:</span>
                    <span className="text-white">5+ years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Projects:</span>
                    <span className="text-white">25+ delivered</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Open Source:</span>
                    <span className="text-white">50+ contributions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Location:</span>
                    <span className="text-white">Remote</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy & Work Style */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">My Philosophy</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  I believe that exceptional software is built through collaboration, 
                  continuous learning, and a deep understanding of user needs. Every 
                  project is an opportunity to push boundaries and create something 
                  that makes a real difference.
                </p>
                <p>
                  My approach centers around clean code, performance optimization, 
                  and creating intuitive experiences that reduce friction for developers 
                  and end users alike.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">How I Work</h2>
              <div className="space-y-4">
                {[
                  'Collaborative planning and requirements gathering',
                  'Rapid prototyping and iterative development',
                  'Performance testing and optimization',
                  'Comprehensive testing and quality assurance',
                  'Clear documentation and knowledge transfer'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="relative">
                {/* Timeline Line */}
                {index < experience.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-[#1F2937]"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                      <span className="badge badge-primary">{job.year}</span>
                    </div>
                    <h4 className="text-lg font-medium text-[#22C55E]">{job.company}</h4>
                    <p className="text-white/70 leading-relaxed">{job.description}</p>
                    
                    {/* Achievements */}
                    <ul className="space-y-1">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-white/60">
                          <div className="w-1 h-1 bg-[#14B8A6] rounded-full"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests & Current Focus */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Interests</h2>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <span key={index} className="badge badge-secondary">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Current Focus</h2>
              <div className="space-y-3">
                {currentFocus.map((focus, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                    <span className="text-white/70">{focus}</span>
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
              Ready to work together?
            </h2>
            <p className="text-white/70 mb-6">
              Let's discuss your project and see how I can help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get in Touch
              </a>
              <a href="/resume" className="btn-secondary">
                View Resume
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}