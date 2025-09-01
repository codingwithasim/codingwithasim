"use client"

import { Project } from "@/app/types/project";
import Image from "next/image";
import { useRef } from "react";
import { Badge } from "./badge";
import Link from "next/link";
import { LucideMoveUpRight } from "lucide-react";

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({project} : ProjectCardProps) {


    const overlayDiv = useRef<HTMLDivElement | null>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      overlayDiv.current = e.currentTarget.querySelector("div.rainbow-glow") as HTMLDivElement;
      if (overlayDiv.current) {
        overlayDiv.current.style.display = "block";
        overlayDiv.current.style.opacity = ".2";
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rainbow = card.querySelector(".rainbow-glow") as HTMLDivElement;

      if (!rainbow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      rainbow.style.left = `${x}px`;
      rainbow.style.top = `${y}px`;
      rainbow.style.transform = "translate(-50%, -50%)";
    };

    const handleMouseLeave = () => {
      if (overlayDiv.current) {
        overlayDiv.current.style.opacity = "0";
      }
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300"></div>
                </div>

                {/* Project Content */}
                <div className="flex-1 space-y-4 z-10">
                    <h5>
                        {project.name}
                    </h5>

                    <p className="text-white/70 text-sm leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pb-8">
                        {project.technologies.map((tag, index) => (
                            <Badge
                                variant="outline"
                                title={tag}
                                key={index}
                                className='border border-gray-700'>{tag}</Badge>
                        ))}
                    </div>

                    {/* Quick Metrics */}
                    {/* <div className="grid grid-cols-3 gap-2 text-xs">
                        {Object.entries(project.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="font-semibold">{value}</div>
                                <div className="text-white/50 capitalize">{key}</div>
                            </div>
                        ))}
                    </div> */}

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

                <div className='w-[500px] h-[500px] rainbow-glow bg-gradient-to-br from-gray-600 via-20% via-gray-100 to-gray-600 opacity-0 absolute z-1 rounded-full blur-3xl transition-[opacity] duration-500'></div>
            </div>

            <Link
                href={project.links.demo}
                target='_blank'
                className='w-10 h-10 border grid place-items-center text-gray-500 border-gray-600 absolute bottom-4 right-4 rounded-full opacity-0 group-hover:opacity-100 hover:text-white hover:border-white transition-all'>
                <LucideMoveUpRight size={16} />
            </Link>
        </div>
    )
}