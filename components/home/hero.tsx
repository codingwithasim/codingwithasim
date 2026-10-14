import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BackgroundPattern } from "./background-pattern";

const reassurances = ["Free first call", "Fixed-price quotes", "English & Français"];

export default function Hero() {
    return (
        <section id="home" className="flex min-h-screen items-center justify-center px-6">
            <BackgroundPattern />

            <div className="relative z-10 max-w-3xl text-center">
                <Badge
                    variant="outline"
                    className="px-4 py-1.5"
                    render={
                        <Link href="/contact">
                            <span className="relative mr-1.5 flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                            </span>
                            Available for new projects
                        </Link>
                    }
                />

                <h1 className="mx-auto mt-6 max-w-2xl font-medium text-4xl tracking-tight sm:text-[2.75rem] md:text-6xl/[1.15]">
                    Websites & web{" "}apps
                    <br />
                    <span className="text-muted-foreground">that actually work.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl md:text-xl/normal">
                    I&apos;m Asim, a full-stack developer in Rouen, France. I help small
                    businesses, founders and agencies launch fast, reliable websites
                    and web apps. Clear fixed prices, no jargon, and absolutely no
                    unnecessary carousels.
                </p>


                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Start a project
                        <ArrowUpRight className="size-5" />
                    </Link>

                    <Link
                        href="#projects"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
                    >
                        See my work
                    </Link>
                </div>

                <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    {reassurances.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                            <Check className="size-4 text-emerald-500" strokeWidth={2} />
                            {item}
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}
