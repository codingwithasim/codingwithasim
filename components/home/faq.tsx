import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Faq = {
  question: string;
  answer: string;
};

export const faqs: Array<Faq> = [
  {
    question: "How much does a website or web app cost?",
    answer:
      "It depends on what you need, so every project gets one fixed price after a free call, before any work starts. You know the full cost upfront. If the budget is tight, I'll suggest what to build first so you can launch sooner and grow from there.",
  },
  {
    question: "How long does it take?",
    answer:
      "A landing page usually takes 1 to 2 weeks and a business website 2 to 4 weeks. Web apps depend on the features. You get a clear timeline with your quote, and regular updates along the way.",
  },
  {
    question: "Do you work with clients in France and abroad?",
    answer:
      "Yes. I'm based in Rouen and work in both English and French (oui, on peut tout faire en français), with clients nearby and remotely.",
  },
  {
    question: "I run an agency. Can you work with my team?",
    answer:
      "Absolutely. I can join your projects as an extra React and Next.js developer, follow your processes and tools, and work white-label under your brand.",
  },
  {
    question: "What do I need to prepare?",
    answer:
      "Just a rough idea of what you want and a few examples of sites you like. I'll guide you through the rest: structure, content, domain and hosting.",
  },
  {
    question: "How does payment work?",
    answer:
      "Usually a deposit to get started and the rest at launch. Larger projects are split into milestones, so you only pay as work gets delivered.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Everything is yours: the code, the domain and the accounts. Bug fixes are free for the first 30 days, and I'm around afterwards for updates and new features whenever you need them.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          {/* Section header */}
          <div className="max-w-md">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              FAQ
            </p>

            <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
              Good
              <span className="text-muted-foreground"> questions.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              The things people usually ask before we start. Anything else?
            </p>

            <Link
              href="/contact"
              className={cn(
                "group mt-6 inline-flex items-center gap-2",
                "text-sm font-medium",
                "transition-colors duration-300 hover:text-muted-foreground"
              )}
            >
              Just ask
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          {/* Questions */}
          <div className="border-t border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-tight transition-colors duration-300 hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                    strokeWidth={1.5}
                  />
                </summary>

                <p className="max-w-2xl pb-6 text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
