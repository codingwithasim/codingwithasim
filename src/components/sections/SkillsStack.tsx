interface Skill {
  name: string;
  category: string;
  level: string;
  icon: string;
  description: string;
}

interface TechCategory {
  name: string;
  icon: string;
  color: string;
  technologies: string[];
}

const SkillsStack = () => {
  const coreSkills: Skill[] = [
    {
      name: 'React',
      category: 'Frontend',
      level: 'Expert',
      icon: '⚛️',
      description: "Building modern user interfaces with hooks, context and performance optimization"
    },
    {
      name: 'TypeScript',
      category: 'Language',
      level: 'Advanced',
      icon: '🔷',
      description: 'Type-safe development with interfaces, generics and utility types'
    },
    {
      name: 'Node.js',
      category: 'Backend',
      level: 'Advanced',
      icon: '🟢',
      description: 'Server-side development with Express, APIs and microservices'
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      level: 'Intermediate',
      icon: '🐘',
      description: 'Relational databases, complex queries and data modeling'
    }
  ];

  const techCategories: TechCategory[] = [
    {
      name: 'Frontend',
      icon: '🎨',
      color: 'from-[#22C55E] to-[#16A34A]',
      technologies: ['React', 'Vue.js', 'Tailwind CSS', 'Next.js']
    },
    {
      name: 'Backend',
      icon: '⚙️',
      color: 'from-[#14B8A6] to-[#0D9488]',
      technologies: ['Node.js', 'Python', 'Go', 'FastAPI']
    },
    {
      name: 'DevOps',
      icon: '🚀',
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      technologies: ['Docker', 'AWS', 'Git', 'CI/CD']
    }
  ];

  return (
    <section className="py-24 bg-[#0F1115]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="font-bold mb-6">
            Skills & <span className="text-[#22C55E]">Stack</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Core technologies I use daily, with a focus on modern web development
            and developer experience.
          </p>
        </div>

        {/* Core Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreSkills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="card h-full text-center hover:border-[#22C55E]/30 transition-all duration-300">
                {/* Skill Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                
                {/* Skill Name */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {skill.name}
                </h3>
                
                {/* Level Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                  {skill.level}
                </div>
                
                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Categories */}
        <div className="space-y-12">
          {techCategories.map((category) => (
            <div key={category.name} className="group">
              <div className="flex items-center mb-8">
                <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {category.name}
                </h3>
                <div className={`ml-4 h-px flex-1 bg-gradient-to-r ${category.color} opacity-60`}></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.technologies.map((tech) => (
                  <div key={tech} className="group/tech">
                    <div className="bg-[#111318] border border-[#1F2937] rounded-xl p-4 text-center hover:border-[#22C55E]/30 hover:bg-[#1F2937] transition-all duration-300 group-hover/tech:scale-105">
                      <div className="text-white/80 font-medium text-sm group-hover/tech:text-white transition-colors duration-200">
                        {tech}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-3 bg-[#111318] border border-[#1F2937] rounded-2xl px-6 py-4">
            <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
            <span className="text-white/80 font-medium">Currently exploring:</span>
            <span className="text-[#22C55E] font-semibold">Rust, WebAssembly</span>
          </div>
        </div>

        {/* Additional Tools */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-medium text-white/80 mb-6">
            Tools & Platforms
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'VS Code', 'Figma', 'Postman', 'Docker', 'GitHub', 'Vercel'
            ].map((tool) => (
              <span key={tool} className="badge badge-primary text-xs">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsStack;