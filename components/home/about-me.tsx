import { ArrowUpRight, Code2, MapPin, GraduationCap, Coffee } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const facts = [
  {
    icon: GraduationCap,
    label: "Currently",
    value: "CS Master's student",
  },
  {
    icon: Code2,
    label: "I work with",
    value: "React · Next.js · TypeScript",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "France 🇫🇷",
  },
  {
    icon: Coffee,
    label: "Powered by",
    value: "Coffee & curiosity ☕",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 max-w-3xl md:mb-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            About me
          </p>

          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            A developer,
            <span className="text-muted-foreground"> not a robot.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="border-t border-border">
          <div className="grid gap-12 border-b border-border py-12 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            {/* Left */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-border" />

                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Who I am
                </span>
              </div>

              <p className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                I like turning ideas into things people can actually use.
              </p>
            </div>

            {/* Right */}
            <div className="max-w-2xl space-y-5 text-base leading-7 text-muted-foreground sm:text-lg">
              <p>
                I&apos;m a Computer Science Master&apos;s student and
                full-stack web developer based in France.
              </p>

              <p>
                Most of my time is spent building with React, Next.js,
                TypeScript, Supabase, and PostgreSQL. I enjoy taking something
                from a rough idea to a working product, figuring things out
                along the way is usually half the fun.
              </p>

              <p>
                I care about interfaces that feel simple, code that makes
                sense, and products that solve an actual problem.
              </p>

              <p className="text-foreground">
                Still learning. Still building. Still occasionally fighting
                with CSS. 😅
              </p>
            </div>
          </div>

          {/* Facts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, index) => {
              const Icon = fact.icon;

              return (
                <div
                  key={fact.label}
                  className={cn(
                    "group py-8 sm:px-6 lg:px-8",
                    index > 0 && "border-t border-border sm:border-l sm:border-t-0",
                    index === 2 && "lg:border-l",
                    index === 3 && "lg:border-l"
                  )}
                >
                  <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-muted/50 transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-foreground/5">
                    <Icon
                      className="size-[17px] text-muted-foreground transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:text-foreground"
                      strokeWidth={1.7}
                    />
                  </div>

                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {fact.label}
                  </p>

                  <p className="text-sm font-medium tracking-tight">
                    {fact.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-16 flex flex-col gap-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Have an idea, a problem to solve, or just a web project that needs
            some attention? I&apos;m always interested in hearing about it. 👋
          </p>

          <Link
            href="#contact"
            className={cn(
              "group inline-flex shrink-0 items-center gap-2",
              "text-sm font-medium",
              "transition-colors duration-300 hover:text-muted-foreground"
            )}
          >
            Let&apos;s talk
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}