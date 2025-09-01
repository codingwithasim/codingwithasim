  'use client';

  import { useRef } from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
  import { LucideMoveUpRight } from 'lucide-react';
  import { Button } from '../ui/button';
  import { Badge } from '../ui/badge';

  const FeaturedProjects = () => {
    const projects = [
      {
        id: 1,
        title: 'Nexusflow',
        description: 'A modern, responsive React landing page for NexusFlow - a fictional team collaboration and workflow automation platform. Built with React, Tailwind CSS, and Framer Motion.',
        image: '/assets/img.png',
        tags: ['React', 'Tailwind'],
        metrics: {
          users: '10k+',
          performance: '99.9%',
          revenue: '$2M+'
        },
        stack: ['Frontend: React + TypeScript', 'Backend: Node.js + Express', 'Database: PostgreSQL', 'Cache: Redis'],
        link: 'https://nexusflow-landing.vercel.app/'
      },
      {
        id: 2,
        title: 'Key Genie',
        description: "A modern, client-side password generator that creates random, memorable passwords and PINs with built-in strength indicators and export functionality.",
        image: '/assets/key_genie.png',
        tags: ['Next.js', 'Tailwind', 'JavaScript'],
        metrics: {
          users: '500+',
          performance: '40%',
          efficiency: 'High'
        },
        stack: ['Frontend: Vue.js + Vuetify', 'Backend: Python + FastAPI', 'Database: MongoDB', 'Deployment: Docker'],
        link: 'https://key-genie.vercel.app/'
      },
      {
        id: 3,
        title: 'Mobile App Backend',
        description: "Scalable backend infrastructure supporting 50k+ mobile app users with real-time features.",
        image: '/api/placeholder/400/250',
        tags: ['Go', 'gRPC', 'Kubernetes', 'Elasticsearch'],
        metrics: {
          users: '50k+',
          performance: '99.5%',
          scale: 'High'
        },
        stack: ['Language: Go', 'Protocol: gRPC', 'Orchestration: Kubernetes', 'Search: Elasticsearch'],
        link: '/projects/mobile-backend'
      },
      
    ];

    const overlayDiv = useRef<HTMLDivElement | null>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      overlayDiv.current = e.currentTarget.querySelector("div.rainbow-glow") as HTMLDivElement;
      if (overlayDiv.current) {
        overlayDiv.current.style.display = "block";
        overlayDiv.current.style.opacity = ".2";
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rainbow = card.querySelector(".rainbow-glow") as HTMLDivElement;

      if (!rainbow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      rainbow.style.left = `${x}px`;
      rainbow.style.top = `${y}px`;
      rainbow.style.transform = "translate(-50%, -50%)";
    };

    const handleMouseLeave = () => {
      if (overlayDiv.current) {
        overlayDiv.current.style.opacity = "0";
      }
    };

    return (
      <section className="py-24">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16 ">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto">
            Featured projects <span className='text-gray-400 font-medium'>showcasing expertise in scalable apps, systems, and developer tools.</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                key={project.id} 
                className="group relative overflow-clip rounded-3xl"
              >
                <div className="card fancy-border h-full flex flex-col transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative mb-6 overflow-hidden rounded-t-xl z-10">
                    <div className="w-full h-48 flex items-center justify-center">
                      <Image
                          className="grayscale group-hover:grayscale-0 duration-700 transition-all"
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={250}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300"></div>
                  </div>

                  {/* Project Content */}
                  <div className="flex-1 space-y-4 z-10">
                    <h5>
                      {project.title}
                    </h5>
                    
                    <p className="text-white/70 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pb-8">
                      {project.tags.map((tag, index) => (
                        <Badge 
                          variant="outline"
                          title={tag} 
                          key={index}
                          className='border border-gray-700'>{tag}</Badge>
                      ))}
                    </div>

                    {/* Quick Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="font-semibold">{value}</div>
                          <div className="text-white/50 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Read Case Study Link */}
                  <div className="pt-4 mt-auto z-10">
                    <Link
                      href={project.link}
                      className="inline-flex items-center transition-colors duration-200 text-sm font-medium group/link"
                    >
                      Read Case Study
                      <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div className='w-[500px] h-[500px] rainbow-glow bg-gradient-to-br from-gray-600 via-20% via-gray-100 to-gray-600 opacity-0 absolute z-1 rounded-full blur-3xl transition-[opacity] duration-500'></div>
                  </div>

                <Link 
                  href={project.link}
                  target='_blank'
                  className='w-10 h-10 border grid place-items-center text-gray-500 border-gray-600 absolute bottom-4 right-4 rounded-full opacity-0 group-hover:opacity-100 hover:text-white hover:border-white transition-all'>
                        <LucideMoveUpRight size={16}/>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button asChild>
              <Link href="/projects" className='py-5'>
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  };

  export default FeaturedProjects;