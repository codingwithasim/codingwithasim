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
      <section className="py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/5 to-transparent"></div>
        
        <div className="container-custom relative">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t('projects.title')}
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* View all button */}
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                {t('projects.viewAll')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  };

  export default FeaturedProjects;