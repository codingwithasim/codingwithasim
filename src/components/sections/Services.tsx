import { LucideCode, LucideServer, LucideGlobe, LucideBrainCircuit } from "lucide-react";
import { IconType } from "react-icons";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  iconColor: string;
}

const Services = () => {
  const services: Service[] = [
    {
      title: "Full-Stack Development",
      description: "End-to-end web applications built with modern frameworks and clean architectures.",
      icon: LucideCode,
      features: ["React / Next.js Frontend", "Node.js Backend", "Database Design", "REST APIs"],
      iconColor: "text-[#22C55E]"
    },
    {
      title: "Frontend Engineering",
      description: "Fast, responsive, and accessible interfaces that focus on user experience.",
      icon: LucideGlobe,
      features: ["Next.js & React", "Tailwind CSS", "Performance Optimization", "SEO Best Practices"],
      iconColor: "text-[#8B5CF6]"
    },
    {
      title: "Backend Development",
      description: "Scalable server-side solutions with secure and efficient APIs.",
      icon: LucideServer,
      features: ["Node.js & Express", "Database Optimization", "Authentication & Security"],
      iconColor: "text-[#14B8A6]"
    },
    {
      title: "Automation & AI Integration",
      description: "Enhance applications and workflows by integrating automation and AI-driven features where it adds real value.",
      icon: LucideBrainCircuit,
      features: ["Process Automation", "API Integrations", "Basic AI Features", "Workflow Optimization"],
      iconColor: "text-[#F59E0B]"
    }
  ];
  

  return (
    <section>
      <div className="container-custom">
        <div className="text-center mb-20">
        <h4 className="font-bold mb-6 max-w-2xl mx-auto">
          Services<span className="text-muted-foreground font-medium"> Turning Ideas Into Reality.</span>
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