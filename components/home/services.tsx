import {
  Code2,
  Database,
  Layers3,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  number: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  iconColor: string;
  iconBackground: string;
};

const services: Service[] = [
  {
    number: "01",
    category: "Full Stack",
    title: "Web Applications",
    description:
      "Full-stack web applications built from the ground up, combining thoughtful interfaces with reliable backend functionality.",
    icon: Code2,
    iconColor: "text-cyan-500 dark:text-cyan-400",
    iconBackground:
      "group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-400/10",
  },
  {
    number: "02",
    category: "Frontend",
    title: "Frontend Development",
    description:
      "Responsive and polished interfaces that feel fast, intuitive, and consistent across every screen size.",
    icon: Layers3,
    iconColor: "text-sky-500 dark:text-sky-400",
    iconBackground:
      "group-hover:bg-sky-500/10 dark:group-hover:bg-sky-400/10",
  },
  {
    number: "03",
    category: "Backend",
    title: "Backend & Data",
    description:
      "The infrastructure behind your application, including authentication, databases, APIs, and server-side functionality.",
    icon: Database,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBackground:
      "group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-400/10",
  },
  {
    number: "04",
    category: "Integrations",
    title: "API & Integrations",
    description:
      "Connecting your application with the services it depends on, from payment providers to third-party APIs.",
    icon: Zap,
    iconColor: "text-violet-500 dark:text-violet-400",
    iconBackground:
      "group-hover:bg-violet-500/10 dark:group-hover:bg-violet-400/10",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 max-w-3xl md:mb-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            What I do
          </p>

          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            How I can
            <span className="text-muted-foreground"> help.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            From focused frontend work to complete web applications, I build
            practical digital products with modern technologies.
          </p>
        </div>

        {/* Services */}
        <div className="border-t border-border">
          {services.map((service) => (
            <ServiceItem key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <article
      className={cn(
        "group border-b border-border py-10 sm:py-12 md:py-14",
        "transition-colors duration-500",
        "hover:bg-muted/30"
      )}
    >
      <div
        className={cn(
          "grid items-start gap-8",
          "md:grid-cols-[80px_1fr_1fr]",
          "md:gap-10 lg:gap-16"
        )}
      >
        {/* Number */}
        <span className="pt-1 text-xs font-medium tabular-nums text-muted-foreground">
          {service.number}
        </span>

        {/* Title */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span
              className={cn(
                "h-px w-8 bg-border",
                "transition-all duration-500 ease-out",
                "group-hover:w-12 group-hover:bg-foreground"
              )}
            />

            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              {service.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Icon */}
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full",
                "transition-all duration-500 ease-out",
                "group-hover:scale-105",
                service.iconBackground
              )}
            >
              <Icon
                className={cn(
                  "size-[18px]",
                  "transition-transform duration-500 ease-out",
                  "motion-safe:group-hover:rotate-6",
                  service.iconColor
                )}
                strokeWidth={1.7}
              />
            </div>

            {/* Title */}
            <h3
              className={cn(
                "text-2xl font-medium tracking-tight",
                "transition-transform duration-500 ease-out",
                "motion-safe:group-hover:translate-x-1",
                "sm:text-3xl"
              )}
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-xl">
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            {service.description}
          </p>
        </div>
      </div>
    </article>
  );
}