'use client';

import { useState } from 'react';
import { Project } from '../types/project';
import ProjectCard from '@/components/ui/project.card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/animations/PageTransition';
import ScrollFadeIn from '@/components/animations/ScrollFadeIn';

export default function Projects() {
  const { t } = useLanguage();
  const [selectedTech, setSelectedTech] = useState('all');

  const projects: Project[] = [
    {
      id: "1",
      name: "ParlezPro",
      description: t('projects.nexus.description'),
      technologies: ["React", "Tailwind", "Framer Motion"],
      cover: "/assets/tutor.png",
      status: "Complete",
      features: [
        t('projects.nexus.feature1'),
        t('projects.nexus.feature2'),
        t('projects.nexus.feature3'),
      ],
      role: "Full-Stack Developer",
      links: {
        demo: "https://parlez-pro.vercel.app/"
        // github_repo: optional
      },
      development_time: "2 months",
      other_notes: null,
      visuals: ["/assets/img.png"]
    },
    {
      id: "2",
      name: "Savora",
      description: t('projects.savora.description'),
      technologies: ["React", "Tailwind", "JavaScript"],
      cover: "/assets/savora.png",
      status: "Complete",
      features: [
        "Password generator",
        "Strength indicators",
        "Export functionality"
      ],
      role: "Frontend Developer",
      links: {
        demo: "https://key-genie.vercel.app/"
      },
      development_time: "1 month",
      other_notes: null,
      visuals: ["/assets/key_genie.png"]
    },
    // {
    //   id: "3",
    //   name: "Mobile App Backend",
    //   description: "Scalable backend infrastructure supporting 50k+ mobile app users with real-time features.",
    //   technologies: ["Go", "gRPC", "Kubernetes", "Elasticsearch"],
    //   cover: "/assets/bistro.webp",
    //   status: "Beta",
    //   features: [
    //     "Real-time data handling",
    //     "High scalability",
    //     "Kubernetes orchestration"
    //   ],
    //   role: "Backend Developer",
    //   links: {
    //     demo: "/projects/mobile-backend"
    //   },
    //   development_time: "3 months",
    //   other_notes: null,
    //   visuals: ["/api/placeholder/400/250"]
    // }
  ];

  const technologies = ['all', 'React', 'Next.js', 'Node.js', 'Python', 'Java'];

  const filteredProjects = projects.filter(project => {
    const techMatch = selectedTech === 'all' || project.technologies.includes(selectedTech);
    return techMatch;
  });

  return (
    <PageTransition>
      <div className="relative min-h-screen isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-500/5 via-accent/10 to-secondary/15 dark:from-indigo-500/10 dark:via-blue-700/15 dark:to-accent/15" />
        <div className="absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] dark:opacity-45">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[720px] w-[720px] rounded-full bg-gradient-to-br from-primary/25 via-transparent to-accent/20 blur-[140px]" />
          <div className="absolute bottom-[-260px] right-[-160px] h-[520px] w-[520px] rounded-full bg-gradient-to-tl from-secondary/20 via-transparent to-primary/20 blur-[140px]" />
        </div>

        {/* Header */}
        <section className="pt-28 pb-16">
          <div className="container-custom">
            <ScrollFadeIn className="mx-auto max-w-3xl text-center space-y-6">
              <span className="text-xs uppercase tracking-[0.35em] text-foreground/60 dark:text-foreground/65">
                {t('projectsPage.filter.all')}
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                {t('projectsPage.title')}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 dark:text-foreground/75">
                {t('projectsPage.description')}
              </p>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2} className="mt-12">
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                      selectedTech === tech
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-foreground/15 text-foreground/70 hover:border-primary/40 hover:text-primary'
                    )}
                  >
                    {tech === 'all' ? t('projectsPage.filter.all') : tech}
                  </button>
                ))}
              </div>
            </ScrollFadeIn>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-24">
          <div className="container-custom">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <ScrollFadeIn key={project.id} delay={index * 0.15}>
                    <ProjectCard project={project} />
                  </ScrollFadeIn>
                ))}
              </div>
            ) : (
              <ScrollFadeIn delay={0.4}>
                <div className="mx-auto max-w-md rounded-3xl border border-foreground/10 bg-white/90 p-12 text-center dark:bg-foreground/[0.12]">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {t('projectsPage.noProjects.title')}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-6">
                    {t('projectsPage.noProjects.description')}
                  </p>
                  <button
                    onClick={() => setSelectedTech('all')}
                    className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 dark:border-primary/60 dark:text-primary/80 dark:hover:bg-primary/10"
                  >
                    {t('projectsPage.clearFilters')}
                  </button>
                </div>
              </ScrollFadeIn>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
