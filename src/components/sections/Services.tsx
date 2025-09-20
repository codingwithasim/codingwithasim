'use client';

import { LucideCode, LucideServer, LucideGlobe, LucideBrainCircuit } from "lucide-react";
import { IconType } from "react-icons";
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
    <section>
      <div className="container-custom">
        <div className="text-center mb-20">
        <h4 className="font-bold mb-6 max-w-2xl mx-auto">
          {t('services.title')}<span className="text-muted-foreground font-medium"> {t('services.subtitle')}</span>
        </h4>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, ...service }) => (
            <div key={service.title} className="group">
              <div className="card bg-card border-border rounded-lg h-full transition-all duration-300 hover:border-muted-foreground">
                <div className={`text-5xl h-20 polka mb-6 grid place-items-center ${service.iconColor}`}>
                  <Icon size={32}/>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h5>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center text-foreground/50 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;