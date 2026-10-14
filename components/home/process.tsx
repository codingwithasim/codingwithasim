import { FileText, MessagesSquare, MonitorSmartphone, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: MessagesSquare,
    title: "Free intro call",
    description:
      "A 20-minute call to understand your business, your goals and what success looks like. No pressure, no jargon.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Clear plan & fixed price",
    description:
      "Within 48 hours you get a written plan with the scope, the timeline and one fixed price. No hourly surprises.",
  },
  {
    number: "03",
    icon: MonitorSmartphone,
    title: "Build & preview",
    description:
      "You follow progress on a live preview link, with regular updates and room for your feedback along the way.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & support",
    description:
      "I handle the launch, hand everything over to you, and fix any bugs for free during the first 30 days.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 max-w-3xl md:mb-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </p>

          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            From first call
            <span className="text-muted-foreground"> to launch.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Working with a developer shouldn&apos;t feel like a gamble. You
            always know what&apos;s being built, when it&apos;s ready, and what
            it costs.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.number}
                className={cn(
                  "group border-border py-10 sm:px-6 lg:px-8",
                  index === 1 && "border-t sm:border-t-0 sm:border-l",
                  index === 2 && "border-t lg:border-t-0 lg:border-l",
                  index === 3 && "border-t sm:border-l lg:border-t-0"
                )}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted/50 transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-foreground/5">
                    <Icon
                      className="size-4.25 text-muted-foreground transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:text-foreground"
                      strokeWidth={1.7}
                    />
                  </div>

                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-medium tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
