'use client';

import { Badge } from "../ui/badge";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { IconType } from "react-icons";
import { SiTypescript } from "react-icons/si";
import { RiSupabaseLine } from "react-icons/ri";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { LuSettings } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";
import ScrollFadeIn from "../animations/ScrollFadeIn";

interface Skill {
  name: string;
  category: string;
  level: string;
  icon: IconType;
  description: string;
  iconColor: string;
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
      color: 'text-foreground',
      technologies: ['React', 'Tailwind CSS', 'Next.js']
    },
    {
      name: 'Backend',
      icon: LuSettings,
      color: 'text-foreground',
      technologies: ['Node.js', 'Supabase']
    },
    {
      name: 'DevOps',
      icon: LuSettings,
      color: 'text-foreground',
      technologies: ['Vercel', 'Github', 'Git']
    }
  ];

  return (
    <section className="relative isolate py-24">
      <div className="container-custom flex flex-col gap-16">
        <ScrollFadeIn className="text-center space-y-4">
          <h4 className="text-3xl font-semibold text-foreground">
            Technologies & Tools <span className="text-foreground/60">I rely on the most.</span>
          </h4>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-foreground/70">
            A compact snapshot of the languages, frameworks, and systems I use to shape focused, resilient products.
          </p>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {coreSkills.map(({icon: Icon, ...skill}, index) => (
            <ScrollFadeIn key={skill.name} delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-foreground/10 bg-white/95 p-6 dark:bg-foreground/[0.06]">
                <div className="flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-foreground/5 ${skill.iconColor}`}>
                      <Icon size={22} />
                    </div>
                    <Badge variant="outline" className="border-foreground/20 bg-foreground/5 text-foreground/70">
                      {skill.level}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-lg font-semibold text-foreground">{skill.name}</h5>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      {skill.description}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-foreground/40">{skill.category}</span>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>

        <div className="space-y-12">
          {techCategories.map(({icon: Icon, ...category}, index) => (
            <ScrollFadeIn key={category.name} delay={index * 0.2}>
              <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/95 p-8 dark:bg-foreground/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-foreground/10 bg-foreground/5">
                    <Icon size={20} className={category.color} />
                  </div>
                  <h5 className="text-2xl font-semibold text-foreground">{category.name}</h5>
                  <div className="ml-auto h-px flex-1 bg-foreground/10" />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
        <ScrollFadeIn delay={0.6} className="mt-8 w-fit self-center">
          <Button className="px-8 border border-foreground/20" variant="outline" asChild>
            <Link href="/uses">
              View All
            </Link>
          </Button>
        </ScrollFadeIn>
      </div>
    </section>
  );
};

export default SkillsStack;
