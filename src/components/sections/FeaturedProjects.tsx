'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Project } from '@/app/types/project';
import ProjectCard from '../ui/project.card';
import { useLanguage } from '@/contexts/LanguageContext';

  const FeaturedProjects = () => {
    const { t } = useLanguage();

    const projects: Project[] = [
      {
        id: "1",
        name: "Nexusflow",
        description: t('projects.nexus.description'),
        technologies: ["React", "Tailwind", "Framer Motion"],
        cover: "/assets/nexus.webp",
        status: "Complete",
        features: [
          t('projects.nexus.feature1'),
          t('projects.nexus.feature2'),
          t('projects.nexus.feature3')
        ],
        role: "Full-Stack Developer",
        links: {
          demo: "https://nexusflow-landing.vercel.app/"
          // github_repo: optional
        },
        development_time: "2 months",
        other_notes: null,
        visuals: ["/assets/img.png"]
      },
      {
        id: "2",
        name: "Key Genie",
        description: t('projects.keygenie.description'),
        technologies: ["Next.js", "Tailwind", "JavaScript"],
        cover: "/assets/genie.webp",
        status: "Complete",
        features: [
          t('projects.keygenie.feature1'),
          t('projects.keygenie.feature2'),
          t('projects.keygenie.feature3')
        ],
        role: "Frontend Developer",
        links: {
          demo: "https://key-genie.vercel.app/"
        },
        development_time: "1 month",
        other_notes: null,
        visuals: ["/assets/key_genie.png"]
      },
      {
        id: "3",
        name: "Mobile App Backend",
        description: t('projects.backend.description'),
        technologies: ["Go", "gRPC", "Kubernetes", "Elasticsearch"],
        cover: "/assets/bistro.webp",
        status: "Beta",
        features: [
          t('projects.backend.feature1'),
          t('projects.backend.feature2'),
          t('projects.backend.feature3')
        ],
        role: "Backend Developer",
        links: {
          demo: "/projects/mobile-backend"
        },
        development_time: "3 months",
        other_notes: null,
        visuals: ["/api/placeholder/400/250"]
      }
    ];
    

    return (
      <section className="py-32">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20 space-y-4">
          <h4 className="font-bold mb-6 max-w-2xl mx-auto">
  {t('projects.title')}<span className="text-muted-foreground font-medium"> {t('projects.subtitle')}</span>
</h4>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-20">
            <Button asChild>
              <Link href="/projects" className='py-6 px-8 text-base'>
                {t('projects.viewAll')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  };

  export default FeaturedProjects;