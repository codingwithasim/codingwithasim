import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BackgroundPattern } from "./background-pattern";

export default function Hero() {
    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <BackgroundPattern />

            <div className="relative z-10 max-w-3xl text-center">
                <Badge
                    variant="outline"
                    className="px-4 py-1.5"
                    render={
                        <Link href="#about">
                            <Sparkles className="mr-1.5 size-3.5" />
                            Hey, I&apos;m Asim & I make the internet slightly less boring.
                        </Link>
                    }
                />

                <h1 className="mx-auto mt-6 max-w-2xl font-medium text-4xl tracking-tight sm:text-[2.75rem] md:text-6xl/[1.15]">
                    I build things that
                    <br />
                    <span className="text-muted-foreground">actually work.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl md:text-2xl/normal">
                    Full-stack developer crafting fast, thoughtful web experiences.
                    Clean code, questionable amounts of coffee, and absolutely no
                    unnecessary carousels.
                </p>


                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/projects"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        See what I&apos;ve built
                        <ArrowUpRight className="size-5" />
                    </Link>

                    <Link
                        href="#contact"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
                    >
                        Let&apos;s talk
                        <Mail className="size-5" />
                    </Link>
                </div>

            </div>
        </div>
    );
}

