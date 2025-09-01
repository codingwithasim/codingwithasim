import { LucideGithub } from "lucide-react";
import { Badge } from "../ui/badge";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { IconType } from "react-icons";
import { SiTypescript } from "react-icons/si";
import { RiSupabaseLine } from "react-icons/ri";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LuSettings } from "react-icons/lu";

interface Skill {
  name: string;
  category: string;
  level: string;
  icon: IconType;
  description: string;
  iconColor: string
}

interface TechCategory {
  name: string;
  icon: IconType;
  color: string;
  technologies: string[];
}

const SkillsStack = () => {
  const coreSkills: Skill[] = [
    {
      name: 'React',
      category: 'Frontend',
      level: 'Expert',
      icon: FaReact,
      description: "Building modern user interfaces with hooks, context and performance optimization",
      iconColor: "text-sky-400"
    },
    {
      name: 'TypeScript',
      category: 'Language',
      level: 'Advanced',
      icon: SiTypescript,
      description: 'Type-safe development with interfaces, generics and utility types',
      iconColor: "text-blue-600"
    },
    {
      name: 'Node.js',
      category: 'Backend',
      level: 'Advanced',
      icon: FaNodeJs,
      description: 'Server-side development with Express, APIs and microservices',
      iconColor: "text-yellow-400"
    },
    {
      name: 'Supabase',
      category: 'Database',
      level: 'Intermediate',
      icon: RiSupabaseLine,
      description: 'Relational databases, complex queries and data modeling',
      iconColor: "text-green-500"
    }
  ];

  const techCategories: TechCategory[] = [
    {
      name: 'Frontend',
      icon: HiOutlineColorSwatch  ,
      color: 'from-[#22C55E] to-[#16A34A]',
      technologies: ['React', 'Vue.js', 'Tailwind CSS', 'Next.js']
    },
    {
      name: 'Backend',
      icon: LuSettings,
      color: 'from-[#14B8A6] to-[#0D9488]',
      technologies: ['Node.js', 'Python', 'Go', 'FastAPI']
    },
    {
      name: 'DevOps',
      icon: LuSettings,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      technologies: ['Docker', 'AWS', 'Git', 'CI/CD']
    }
  ];

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="text-center mb-20">
        <h4 className="font-bold mb-6 max-w-2xl mx-auto">
          Technologies & Tools<span className='text-gray-400 font-medium'> I most commonly use.</span>
          </h4>
        </div>

        {/* Core Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreSkills.map(({icon: Icon, ...skill}) => (
            <div key={skill.name} className="group">
              <div className="card bg-black border-[#323232] rounded-lg  h-full transition-all duration-300 hover:border-[#585858]">
                {/* Skill Icon */}
                <div className={`text-5xl h-30  polka mb-4 grid place-items-center ${skill.iconColor}`}>
                  <Icon size={28}/>
                </div>
                
                <div className="flex items-center justify-between">
                  {/* Skill Name */}
                <h5 className="text-xl font-semibold text-white">
                  {skill.name}
                </h5>
                
                {/* Level Badge */}
                <Badge>
                  {skill.level}
                </Badge>
                </div>
                
                {/* Description */}
                <p className="text-white/60 pt-2 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Categories */}
        <div className="space-y-12">
          {techCategories.map(({icon: Icon, ...category}) => (
            <div key={category.name} className="group">
              <div className="flex items-center mb-8">
                <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24}/>
                </div>
                <h5 className="text-2xl font-semibold text-white">
                  {category.name}
                </h5>
                <div className={`ml-4 h-px flex-1 bg-gradient-to-r bg-[#383838] opacity-60`}></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.technologies.map((tech) => (
                  <div key={tech} className="group/tech">
                    <div className="border border-[#2b2b2b] rounded-md p-4 text-center transition-all duration-300 hover:border-[#444444]">
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