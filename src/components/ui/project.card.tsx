"use client"

import { Project } from "@/app/types/project";
import Image from "next/image";
import { Badge } from "./badge";
import Link from "next/link";
import { LucideMoveUpRight } from "lucide-react";

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({project} : ProjectCardProps) {
    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04]">
            <div className="relative aspect-[4/3] overflow-hidden bg-foreground/[0.06]">
                <Image
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    src={project.cover}
                    alt={project.name}
                    width={600}
                    height={450}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            <div className="flex flex-1 flex-col gap-5 p-6">
                <div className="space-y-2">
                    <h5 className="text-lg font-semibold text-foreground">
                        {project.name}
                    </h5>
                    <p className="text-sm leading-relaxed text-foreground/70">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tag, index) => (
                        <Badge
                            variant="outline"
                            title={tag}
                            key={index}
                            className="border border-foreground/15 bg-foreground/5 text-foreground/70"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-4 text-sm text-foreground/70">
                    <Link
                        href={project.links.demo}
                        className="inline-flex items-center gap-2 font-medium transition-colors hover:text-foreground"
                    >
                        Visit Website
                        <LucideMoveUpRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
