'use client';

import { LucideCode, LucideServer, LucideGlobe, LucideBrainCircuit } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  iconColor: string;
}

const Services = () => {
  const { t } = useLanguage();
  
  const services: Service[] = [
    {
      title: t('services.fullstack.title'),
      description: t('services.fullstack.description'),
      icon: LucideCode,
      features: [t('services.fullstack.feature1'), t('services.fullstack.feature2'), t('services.fullstack.feature3'), t('services.fullstack.feature4')],
      iconColor: "text-[#22C55E]"
    },
    {
      title: t('services.frontend.title'),
      description: t('services.frontend.description'),
      icon: LucideGlobe,
      features: [t('services.frontend.feature1'), t('services.frontend.feature2'), t('services.frontend.feature3'), t('services.frontend.feature4')],
      iconColor: "text-[#8B5CF6]"
    },
    {
      title: t('services.backend.title'),
      description: t('services.backend.description'),
      icon: LucideServer,
      features: [t('services.backend.feature1'), t('services.backend.feature2'), t('services.backend.feature3')],
      iconColor: "text-[#14B8A6]"
    },
    {
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      icon: LucideBrainCircuit,
      features: [t('services.ai.feature1'), t('services.ai.feature2'), t('services.ai.feature3'), t('services.ai.feature4')],
      iconColor: "text-[#F59E0B]"
    }
  ];
  

  return (
    <section className="py-24 relative">
      {/* Subtle background element */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent"></div>
      
      <div className="container-custom relative">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('services.title')}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map(({ icon: Icon, ...service }) => (
              <div key={service.title}  className="group relative p-8 rounded-2xl border border-border bg-card backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-primary/5 dark:border-border/50 dark:bg-card/80 dark:hover:border-border/70">
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${service.iconColor} bg-gradient-to-br from-background to-muted/20 dark:from-muted/30 dark:to-muted/10`}>
                  <Icon size={24} />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h4>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features list */}
                  <div className="space-y-2 pt-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0 dark:bg-primary/80"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none dark:from-primary/10"></div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;