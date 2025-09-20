"use client"

import { Project } from "@/app/types/project";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Badge } from "./badge";
import Link from "next/link";
import { LucideMoveUpRight } from "lucide-react";
import { attachSpotlightTo } from "@/utils/spotlight";

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({project} : ProjectCardProps) {


    const overlayDiv = useRef<HTMLDivElement | null>(null);

    useEffect(()=> {
        attachSpotlightTo(overlayDiv)
    }, [])

    return (
        <div
            ref={overlayDiv}
            key={project.id}
            className="group relative overflow-clip rounded-3xl"
        >
            <div className="card fancy-border h-full flex flex-col transition-all duration-300">
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-t-xl z-10">
                    <div className="w-full h-48 flex items-center justify-center">
                        <Image
                            className="grayscale group-hover:grayscale-0 duration-700 transition-all"
                            src={project.cover}
                            alt={project.name}
                            width={400}
                            height={250}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 transition-opacity duration-300"></div>
                </div>

                {/* Project Content */}
                <div className="flex-1 space-y-4 z-10">
                    <h5>
                        {project.name}
                    </h5>

                    <p className="text-foreground/70 text-sm leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pb-8">
                        {project.technologies.map((tag, index) => (
                            <Badge
                                variant="outline"
                                title={tag}
                                key={index}
                                className='border border-border'>{tag}</Badge>
                        ))}
                    </div>

                </div>

                {/* Read Case Study Link */}
                <div className="pt-4 mt-auto z-10">
                    <Link
                        href={project.links.demo}
                        className="inline-flex items-center transition-colors duration-200 text-sm font-medium group/link"
                    >
                        Read Case Study
                        <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className='spotlight w-[500px] h-[500px] rainbow-glow bg-gradient-to-br from-gray-600 via-20% via-gray-100 to-gray-600 opacity-0 absolute z-1 rounded-full blur-3xl transition-[opacity] duration-500'></div>
            </div>

            <Link
                href={project.links.demo}
                target='_blank'
                className='w-10 h-10 border grid place-items-center text-muted-foreground border-border absolute bottom-4 right-4 rounded-full opacity-0 group-hover:opacity-100 hover:text-foreground hover:border-foreground transition-all'>
                <LucideMoveUpRight size={16} />
            </Link>
        </div>
    )
}