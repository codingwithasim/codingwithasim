'use client';

import { useState } from 'react';
import { Project } from '../types/project';
import ProjectCard from '@/components/ui/project.card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const projects: Project[] = [
    {
      id: "1",
      name: "Nexusflow",
      description: "A modern, responsive React landing page for NexusFlow - a fictional team collaboration and workflow automation platform. Built with React, Tailwind CSS, and Framer Motion.",
      technologies: ["React", "Tailwind", "Framer Motion"],
      cover: "/assets/nexus.webp",
      status: "Complete",
      features: [
        "Responsive design",
        "Workflow automation simulation",
        "Interactive UI"
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
      description: "A modern, client-side password generator that creates random, memorable passwords and PINs with built-in strength indicators and export functionality.",
      technologies: ["Next.js", "Tailwind", "JavaScript"],
      cover: "/assets/genie.webp",
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
    {
      id: "3",
      name: "Mobile App Backend",
      description: "Scalable backend infrastructure supporting 50k+ mobile app users with real-time features.",
      technologies: ["Go", "gRPC", "Kubernetes", "Elasticsearch"],
      cover: "/assets/bistro.webp",
      status: "Beta",
      features: [
        "Real-time data handling",
        "High scalability",
        "Kubernetes orchestration"
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

  const technologies = ['all', 'React', 'Next.js', 'Node.js', 'Python', 'Java'];

  const filteredProjects = projects.filter(project => {
    const techMatch = selectedTech === 'all' || project.technologies.includes(selectedTech);
    return techMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h3 className="mb-6">
              {t('projectsPage.title')}
            </h3>
            <p className="text-white/70 max-w-3xl mx-auto leading-relaxed">
              {t('projectsPage.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Technology Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  variant={selectedTech === tech ? "default" : "secondary"}
                  className='py-1 cursor-pointer'
                >
                  {tech === 'all' ? t('projectsPage.filter.all') : tech}
                </Badge>
              ))}
            </div>

            
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 mx-auto max-w-6xl">
        <div className="container-custom">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-4">{t('projectsPage.noProjects.title')}</h3>
              <p className="text-white/60 mb-8">
                {t('projectsPage.noProjects.description')}
              </p>
              <button
                onClick={() => {
                  setSelectedTech('all');
                  setSelectedType('all');
                }}
                className="btn-secondary"
              >
                {t('projectsPage.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}