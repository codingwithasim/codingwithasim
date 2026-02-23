'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LucideMoveUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Project } from '@/app/types/project';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollFadeIn from '../animations/ScrollFadeIn';

const accentPalette = [
  {
    badge: 'text-foreground/70',
    chip: 'border-foreground/15 bg-foreground/5 text-foreground/70',
    divider: 'bg-foreground/10',
    index: 'text-foreground/60',
  },
  {
    badge: 'text-foreground/70',
    chip: 'border-foreground/15 bg-foreground/5 text-foreground/70',
    divider: 'bg-foreground/10',
    index: 'text-foreground/60',
  },
  {
    badge: 'text-foreground/70',
    chip: 'border-foreground/15 bg-foreground/5 text-foreground/70',
    divider: 'bg-foreground/10',
    index: 'text-foreground/60',
  },
];

const projectsColors: Record<string, string> = {
  '1': "bg-foreground/5",
  '2': "bg-foreground/5",
  '3': "bg-foreground/5",
}

const FeaturedProjects = () => {
  const { t } = useLanguage();

  const projects: Project[] = [
    {
      id: '1',
      name: 'ParlezPro',
      description: t('projects.nexus.description'),
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      cover: '/assets/tutor.png',
      status: 'Complete',
      features: [
        t('projects.nexus.feature1'),
        t('projects.nexus.feature2'),
        t('projects.nexus.feature3'),
      ],
      role: 'Full-Stack Developer',
      links: {
        demo: 'https://parlez-pro.vercel.app/',
      },
      development_time: '2 months',
      other_notes: null,
      visuals: ['/assets/img.png'],
    },
    {
      id: '2',
      name: 'Savora',
      description: t('projects.savora.description'),
      technologies: ['React', 'Tailwind', 'JavaScript'],
      cover: '/assets/savora.png',
      status: 'Complete',
      features: [
        t('projects.keygenie.feature1'),
        t('projects.keygenie.feature2'),
        t('projects.keygenie.feature3'),
      ],
      role: 'Frontend Developer',
      links: {
        demo: 'https://savora-eight.vercel.app/',
      },
      development_time: '1 month',
      other_notes: null,
      visuals: ['/assets/key_genie.png'],
    },
    // {
    //   id: '3',
    //   name: 'Mobile App Backend',
    //   description: t('projects.backend.description'),
    //   technologies: ['Go', 'gRPC', 'Kubernetes', 'Elasticsearch'],
    //   cover: '/assets/bistro.webp',
    //   status: 'Beta',
    //   features: [
    //     t('projects.backend.feature1'),
    //     t('projects.backend.feature2'),
    //     t('projects.backend.feature3'),
    //   ],
    //   role: 'Backend Developer',
    //   links: {
    //     demo: '/projects/mobile-backend',
    //   },
    //   development_time: '3 months',
    //   other_notes: null,
    //   visuals: ['/api/placeholder/400/250'],
    // },
  ];

  return (
    <section className="relative isolate py-24">
      <div className="container-custom relative">
        <ScrollFadeIn className="mb-20 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">
            Signature Projects
          </p>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t('projects.title')}
          </h3>
          <p className="mx-auto max-w-2xl text-base text-foreground/70">
            {t('projects.subtitle')}
          </p>
        </ScrollFadeIn>

        <div className="flex flex-col gap-20">
          {projects.map((project, index) => {
            const accent = accentPalette[index % accentPalette.length];
            const previewLink = project.links.demo;
            const isExternal = previewLink.startsWith('http');
            const isReversed = index % 2 === 1;

            const bgColor: string = projectsColors[project.id]

            return (
              <ScrollFadeIn key={project.id} delay={index * 0.15}>
                <article className="relative group overflow-hidden rounded-[3rem] border border-foreground/15 bg-white/95 p-6 md:p-10 lg:p-14 dark:bg-foreground/[0.06]">
                  <div
                    className={`grid gap-12 ${isReversed ? 'lg:grid-cols-[1.15fr_1fr]' : 'lg:grid-cols-[1fr_1.15fr]'} lg:items-center`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/95 p-4 dark:bg-foreground/[0.04] ${
                        isReversed ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div className={bgColor + " aspect-[4/3] relative overflow-hidden rounded-2xl dark:grayscale-100 transition-all dark:group-hover:grayscale-0"}>
                        <Image
                          src={project.cover}
                          alt={project.name}
                          fill
                          className=" mx-auto object-contain"
                        />
                      </div>
                      <div className="absolute inset-x-8 bottom-6 flex items-center justify-between rounded-full border border-foreground/10 bg-white/90 px-6 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-foreground/60 dark:bg-foreground/[0.06] dark:text-foreground/70">
                        <span>{project.role}</span>
                        <span className="hidden h-px flex-1 bg-foreground/10 sm:block dark:bg-foreground/30" />
                        <span>{project.development_time}</span>
                      </div>
                    </div>

                    <div className={`flex flex-col gap-8 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-6">
                        <div className="flex items-center gap-5 text-[0.7rem] uppercase tracking-[0.4em] text-foreground/50">
                          <span className={`font-semibold ${accent.index}`}>
                            Project {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className={`hidden h-px flex-1 ${accent.divider} lg:block`} />
                          <span className={`font-medium ${accent.badge}`}>{project.status}</span>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-3xl md:text-[2.5rem] font-semibold leading-tight text-foreground">
                            {project.name}
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed text-foreground/70">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <dl className="grid grid-cols-1 gap-4 text-sm text-foreground/65 sm:grid-cols-3">
                        <div className="space-y-1">
                          <dt className="text-xs uppercase tracking-[0.25em] text-foreground/50">Focus</dt>
                          <dd className="text-sm font-medium text-foreground">{project.role}</dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs uppercase tracking-[0.25em] text-foreground/50">Timeline</dt>
                          <dd className="text-sm font-medium text-foreground">{project.development_time}</dd>
                        </div>
                        <div className="space-y-1">
                          <dt className="text-xs uppercase tracking-[0.25em] text-foreground/50">Stack</dt>
                          <dd className="flex flex-wrap gap-2 text-xs text-foreground/70">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </dd>
                        </div>
                      </dl>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`rounded-full border px-4 py-2 text-xs font-medium ${accent.chip}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.features?.length ? (
                        <ol className="grid gap-3 text-sm text-foreground/70">
                          {project.features.map((feature, featureIndex) => (
                            <li key={feature} className="flex items-start gap-4">
                              <span className={`text-xs font-bold ${accent.badge} mt-0.5`}>
                                {String(featureIndex + 1).padStart(2, '0')}
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ol>
                      ) : null}

                      <div className="pt-2">
                        <Button variant="outline" asChild className="border border-foreground/20 bg-white/90 text-foreground dark:bg-foreground/[0.06] dark:text-foreground">
                          <Link
                            href={previewLink}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                          >
                            Preview Project
                            <LucideMoveUpRight size={16} className="ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
