'use client';

import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Palette, Code, Rocket } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  details: string[];
  color: string;
  gradient: string;
}

export default function ProcessSection() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      description: 'Understanding your vision, goals, and technical requirements through detailed consultation.',
      icon: Lightbulb,
      details: [
        'Comprehensive project analysis',
        'Technology stack planning',
        'User experience mapping',
        'Performance requirements'
      ],
      color: 'text-amber-400',
      gradient: 'from-amber-400/20 to-amber-600/10'
    },
    {
      number: '02', 
      title: 'Design & Architecture',
      description: 'Crafting intuitive user interfaces and robust system architecture for scalability.',
      icon: Palette,
      details: [
        'UI/UX design systems',
        'Database architecture',
        'API design patterns',
        'Security implementation'
      ],
      color: 'text-violet-400',
      gradient: 'from-violet-400/20 to-violet-600/10'
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'Building with modern technologies while maintaining code quality and performance.',
      icon: Code,
      details: [
        'Agile development cycles',
        'Code review processes',
        'Automated testing',
        'Performance optimization'
      ],
      color: 'text-emerald-400',
      gradient: 'from-emerald-400/20 to-emerald-600/10'
    },
    {
      number: '04',
      title: 'Launch & Growth',
      description: 'Deploying your solution and providing ongoing support for continuous improvement.',
      icon: Rocket,
      details: [
        'Production deployment',
        'Performance monitoring',
        'User feedback integration',
        'Feature enhancement'
      ],
      color: 'text-teal-400',
      gradient: 'from-teal-400/20 to-teal-600/10'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => [...new Set([...prev, stepIndex])]);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    const stepElements = sectionRef.current?.querySelectorAll('[data-step]');
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden">
      <div className="container-custom max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-amber-500/20 mb-6">
            <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">My Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            From <span className="text-amber-400">Concept</span> to{' '}
            <span className="text-teal-400">Launch</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            A proven methodology that transforms ideas into exceptional digital experiences through strategic planning and meticulous execution.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-amber-400/20 via-violet-400/20 via-emerald-400/20 to-teal-400/20"></div>
          
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                data-step={index}
                className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-700 ${
                  visibleSteps.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                } ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                
                {/* Step Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center ${step.color}`}>
                        <step.icon size={28} />
                      </div>
                      <span className={`text-6xl font-bold ${step.color} opacity-50`}>
                        {step.number}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className={`text-3xl font-bold mb-4 ${step.color}`}>
                        {step.title}
                      </h3>
                      <p className="text-xl text-foreground/70 leading-relaxed mb-6">
                        {step.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detail}
                          className={`flex items-center justify-center lg:justify-start text-foreground/60 transition-all duration-500 ${
                            visibleSteps.includes(index) 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 translate-x-8'
                          }`}
                          style={{ transitionDelay: `${(index * 200) + (detailIndex * 100) + 300}ms` }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-3 ${step.color} opacity-60`}></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step Visualization */}
                <div className="flex-1 flex justify-center">
                  <div className={`relative group transition-all duration-700 ${
                    visibleSteps.includes(index)
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95'
                  }`}>
                    <div className={`w-64 h-64 rounded-3xl bg-gradient-to-br ${step.gradient} border border-foreground/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <step.icon size={80} className={`${step.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    
                    {/* Floating elements */}
                    <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${step.color} opacity-20 animate-float`} style={{ animationDelay: '0s' }}></div>
                    <div className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-full ${step.color} opacity-30 animate-float`} style={{ animationDelay: '2s' }}></div>
                    <div className={`absolute top-1/4 -left-6 w-4 h-4 rounded-full ${step.color} opacity-25 animate-float`} style={{ animationDelay: '4s' }}></div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-lg text-foreground/60">
              Ready to start your project?
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-teal-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25">
              <span className="relative z-10">Let's Work Together</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}