'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  projectType: string;
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechFlow Solutions',
      content: 'Muhammad delivered exceptional results on our e-commerce platform. His attention to detail and ability to translate complex requirements into elegant solutions was remarkable. The project was delivered ahead of schedule with outstanding performance.',
      rating: 5,
      avatar: '/assets/profile.jpeg', // Placeholder
      projectType: 'E-commerce Platform'
    },
    {
      id: '2', 
      name: 'David Chen',
      role: 'CTO',
      company: 'InnovateHub',
      content: 'Working with Muhammad was a game-changer for our startup. He not only built a robust backend system but also provided valuable insights on scalability. His code quality and documentation standards are top-notch.',
      rating: 5,
      avatar: '/assets/profile.jpeg', // Placeholder
      projectType: 'SaaS Platform'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Design Director',
      company: 'CreativeStudio',
      content: 'Muhammad perfectly bridged the gap between design and development. He understood our creative vision and implemented it with pixel-perfect accuracy while ensuring optimal performance. Truly professional collaboration.',
      rating: 5,
      avatar: '/assets/profile.jpeg', // Placeholder
      projectType: 'Portfolio Website'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handleTestimonialChange = (index: number) => {
    setActiveTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-32 bg-gradient-to-br from-muted/10 via-background to-muted/5 overflow-hidden">
      <div className="container-custom max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-emerald-500/10 border border-violet-500/20 mb-6">
            <Star className="w-4 h-4 text-violet-400 fill-current" />
            <span className="text-violet-400 text-sm font-medium tracking-wide uppercase">Client Success</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            What <span className="text-violet-400">Clients Say</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Real feedback from real projects. See how we've helped businesses achieve their digital goals.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Main Testimonial Display */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeTestimonial
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group hover:border-border hover:bg-card/80 transition-all duration-500">
                  
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 text-violet-400/20">
                    <Quote size={48} fill="currentColor" />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className="text-amber-400 fill-current animate-pulse" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8 max-w-3xl mx-auto font-light italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-violet-400/20 group-hover:border-violet-400/40 transition-colors duration-300">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-semibold text-foreground mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-foreground/60 mb-1">
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                        <span className="text-violet-400 text-sm font-medium">
                          {testimonial.projectType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? 'bg-violet-400 scale-125'
                    : 'bg-foreground/20 hover:bg-foreground/40'
                }`}
              >
                {index === activeTestimonial && (
                  <div className="absolute inset-0 rounded-full bg-violet-400 animate-ping"></div>
                )}
              </button>
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center gap-2 text-foreground/40 text-sm">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-foreground/20'}`}></div>
              <span>{isAutoPlaying ? 'Auto-playing testimonials' : 'Manual navigation'}</span>
            </div>
          </div>

        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Satisfied Clients', value: '50+', icon: '🎯' },
            { label: 'Projects Completed', value: '80+', icon: '🚀' },
            { label: 'Average Rating', value: '4.9/5', icon: '⭐' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card/30 border border-border/30 hover:bg-card/50 hover:border-border/50 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-violet-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-foreground/60 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}