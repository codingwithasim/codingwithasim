import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Globe, 
  ShoppingCart, 
  Smartphone
} from 'lucide-react';
import {  Utensils, RefreshCcw, Zap, Shield } from "lucide-react";


interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  pricing: [string, string];
  timeline: string;
}

export default function ServicesPage() {

  const services: Service[] = [
    {
      id: "onepage",
      title: "One-Page Websites",
      description:
        "A modern digital brochure site that presents your business, contact details, and services in one clean page.",
      icon: Globe,
      features: [
        "Responsive mobile-first design",
        "Business info & contact details",
        "Google Maps integration",
        "Call-to-action button",
      ],
      pricing: ["200€", "600€"],
      timeline: "3–5 days",
    },
    {
      id: "restaurant",
      title: "Restaurant Websites",
      description:
        "Tailor-made websites for restaurants, cafés, and bars designed to attract more guests and simplify reservations.",
      icon: Utensils,
      features: [
        "Online menu with photos",
        "Table reservation button",
        "Takeaway & delivery links",
        "Optimized for Google & mobile",
      ],
      pricing: ["300€", "1200€"],
      timeline: "5–10 days",
    },
    {
      id: "redesign",
      title: "Website Redesigns",
      description:
        "Transform outdated or confusing websites into modern, elegant platforms that convert visitors into customers.",
      icon: RefreshCcw,
      features: [
        "UI/UX improvements",
        "Faster loading time",
        "Better mobile experience",
        "Improved navigation & clarity",
      ],
      pricing: ["300€", "1000€"],
      timeline: "5–7 days",
    },
    {
      id: "performance",
      title: "Performance Optimization",
      description:
        "Boost your website’s loading speed and SEO so customers stay longer and find you more easily.",
      icon: Zap,
      features: [
        "Core Web Vitals improvement",
        "SEO optimization",
        "Faster loading speed",
        "Better conversion rates",
      ],
      pricing: ["150€", "400€"],
      timeline: "2–4 days",
    },
    {
      id: "maintenance",
      title: "Website Maintenance",
      description:
        "Keep your site secure, updated, and fresh with a recurring monthly service tailored to your needs.",
      icon: Shield,
      features: [
        "Security updates",
        "Content updates",
        "Bug fixes",
        "Performance monitoring",
      ],
      pricing: ["50€/month", "150€/month"],
      timeline: "Ongoing",
    },
  ];


  const process = [
    {
      step: "Discovery",
      description: "We discuss your goals, requirements, and vision to create a project roadmap."
    },
    {
      step: "Development", 
      description: "I build your solution using modern technologies with regular progress updates."
    },
    {
      step: "Launch",
      description: "Testing, deployment, and ongoing support to ensure your success."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16" role="banner">
        <div className="container-custom max-w-4xl">
          <div className="text-center space-y-6">
            <h3 className="mb-6">
              Web Development Services
            </h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Professional web solutions that help businesses grow. From landing pages to complex applications, 
              built with modern technologies and best practices.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {["Modern Stack", "SEO Ready", "Mobile First", "Performance Optimized"].map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16" aria-labelledby="services-heading">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="services-heading">
              What I Build<span className="text-gray-400 font-medium"> Crafted for Success.</span>
            </h4>
            <p className="text-white/60 max-w-2xl mx-auto">
              Each project is crafted with attention to detail, modern design principles, and technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ icon: Icon, ...service }) => (
              <article 
                key={service.id}
                className="group border border-[#323232] rounded-lg p-8 hover:border-[#585858] transition-all duration-300 bg-black"
                itemScope 
                itemType="https://schema.org/Service"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                    <Icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-xl font-medium text-white mb-2"
                      itemProp="name"
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="text-white/60 text-sm leading-relaxed mb-4"
                      itemProp="description"
                    >
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <span className="text-white font-medium">{service.pricing[0] + " - " + service.pricing[1]}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/50">{service.timeline}</span>
                    </div>

                    <div className="space-y-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center text-white/50 text-sm">
                          <div className="w-1 h-1 rounded-full bg-white/30 mr-3 flex-shrink-0" aria-hidden="true"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16" aria-labelledby="process-heading">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="process-heading">
              How I Work
            </h4>
            <p className="text-white/60 max-w-2xl mx-auto">
              A streamlined approach focused on clear communication and quality results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{item.step}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16" aria-labelledby="additional-services-heading">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="additional-services-heading">
              Additional Services
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              "SEO Optimization",
              "Performance Tuning", 
              "Maintenance & Updates",
              "Technical Consulting"
            ].map((service) => (
              <div key={service} className="p-4 border border-[#323232] rounded-lg bg-black/50">
                <p className="text-white/70 text-sm">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" aria-labelledby="cta-heading">
        <div className="container-custom max-w-2xl">
          <div className="text-center border border-[#323232] rounded-lg p-8 bg-black/50">
            <h4 className="font-bold mb-6 max-w-2xl mx-auto" id="cta-heading">
              Ready to start your project?
            </h4>
            <p className="text-white/60 mb-6">
              Let's discuss your ideas and create something great together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link 
                  href="/contact"
                  aria-label="Contact Muhammad Asim to discuss your project"
                >
                  Get in Touch
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link 
                  href="/projects"
                  aria-label="View Muhammad Asim's previous work and projects"
                >
                  View My Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}