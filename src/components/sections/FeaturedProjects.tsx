'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Project } from '@/app/types/project';
import ProjectCard from '../ui/project.card';

  const FeaturedProjects = () => {

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
    

    return (
      <section className="py-32">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Featured Work
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Showcasing expertise in scalable applications, systems, and developer tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-20">
            <Button asChild>
              <Link href="/projects" className='py-6 px-8 text-base'>
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  };

  export default FeaturedProjects;