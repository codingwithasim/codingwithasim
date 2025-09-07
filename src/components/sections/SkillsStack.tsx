import { LucideGithub } from "lucide-react";
import { Badge } from "../ui/badge";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { IconType } from "react-icons";
import { SiTypescript } from "react-icons/si";
import { RiSupabaseLine } from "react-icons/ri";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LuSettings } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";

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
      technologies: ['React', 'Tailwind CSS', 'Next.js']
    },
    {
      name: 'Backend',
      icon: LuSettings,
      color: 'from-[#14B8A6] to-[#0D9488]',
      technologies: ['Node.js', 'Supabase']
    },
    {
      name: 'DevOps',
      icon: LuSettings,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      technologies: ['Vercel', 'Github', 'Git']
    }
  ];

  return (
    <section>
      <div className="container-custom flex flex-col">
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
                <Badge variant="outline" className="border-[#4a4a4a]">
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
        <div className="space-y-16">
          {techCategories.map(({icon: Icon, ...category}, index) => (
            <div key={category.name} className="group relative">
              {/* Category Header with Icon */}
              <div className="flex items-center mb-8 group-hover:translate-x-2 transition-transform duration-300">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className="text-white"/>
                </div>
                <h5 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300">
                  {category.name}
                </h5>
                <div className="ml-6 h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent"></div>
              </div>
              
              {/* Technologies in a flowing layout */}
              <div className="pl-16">
                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div 
                      key={tech} 
                      className="group/tech relative overflow-hidden"
                      style={{
                        animationDelay: `${techIndex * 100}ms`
                      }}
                    >
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                        {tech}
                      </div>
                      
                      {/* Subtle glow effect on hover */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color} opacity-0 group-hover/tech:opacity-20 blur-sm transition-opacity duration-300 -z-10`}></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Connecting line to next category */}
              {index < techCategories.length - 1 && (
                <div className="absolute left-6 -bottom-8 w-px h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
        <Button className="mt-8 w-fit self-center px-8" asChild>
          <Link href="/uses">
            View All
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default SkillsStack;