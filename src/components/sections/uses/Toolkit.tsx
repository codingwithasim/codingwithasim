"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code2, Coffee, Database, Figma, FileText, GitBranch, Github, Headphones, Keyboard, Layers, Layout, MessageSquare, Monitor, Mouse, Paintbrush, Palette, Sparkles, Terminal, Type, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { TbApi } from "react-icons/tb";

type SkillCardProps = {
    title: string, 
    subtitle: string,
    description: string,
    icon: IconType,
    color: string
}

const filters  = ["All", "Core Technologies", "Development Tools", "Design & Productivity", "Hardware & Fun"] as const
type FilterTypes = typeof filters[number]

export default function Toolkit() {

    const skills: SkillCardProps[] = [
        { title: "React", subtitle: "Core Technologies", description: "The foundation of my frontend development with hooks and modern patterns", icon: Code2, color: "#3B82F6" },
        { title: "Next.js", subtitle: "Core Technologies", description: "Full-stack React framework for production-ready applications", icon: Zap, color: "#22C55E" },
        { title: "Tailwind CSS", subtitle: "Core Technologies", description: "Utility-first CSS framework for rapid UI development", icon: Palette, color: "#FACC15" },
        { title: "Node.js", subtitle: "Core Technologies", description: "JavaScript runtime for building scalable backend services", icon: Database, color: "#10B981" },
        { title: "TypeScript", subtitle: "Core Technologies", description: "Strongly typed JavaScript for better developer experience", icon: Type, color: "#2563EB" },
        { title: "GitHub", subtitle: "Core Technologies", description: "Version control and collaboration platform for all my projects", icon: Github, color: "#6B7280" },
        { title: "Git", subtitle: "Development Tools", description: "Distributed version control system for tracking code changes", icon: GitBranch, color: "#F97316" },
        { title: "VS Code", subtitle: "Development Tools", description: "Primary code editor with extensive extensions and themes", icon: Monitor, color: "#6366F1" },
        { title: "Postman", subtitle: "Development Tools", description: "API testing and development environment for REST and GraphQL", icon: Code2, color: "#FF6C37" },
        { title: "REST Client", subtitle: "Development Tools", description: "API testing extension for REST", icon: TbApi, color: "#8B5CF6" },
        { title: "Figma", subtitle: "Design & Productivity", description: "Collaborative design tool for UI/UX and prototyping", icon: Figma, color: "#F24E1E" },
        { title: "Notion", subtitle: "Design & Productivity", description: "All-in-one workspace for notes, docs, and project management", icon: FileText, color: "#0F172A" },
        { title: "Canva", subtitle: "Design & Productivity", description: "Quick graphic design for social media and presentations", icon: Paintbrush, color: "#EC4899" },
        { title: "Keychron K3", subtitle: "Hardware & Fun", description: "Low-profile mechanical keyboard with Gateron switches", icon: Keyboard, color: "#F43F5E" },
        { title: "Logitech MX Master", subtitle: "Hardware & Fun", description: "Precision mouse with customizable buttons and scroll wheel", icon: Mouse, color: "#8B5CF6" },
        { title: "AirPods Pro", subtitle: "Hardware & Fun", description: "Noise-cancelling headphones for focus during deep work", icon: Headphones, color: "#3B82F6" }
    ];

    const [filter, setFilter] = useState<FilterTypes>("Core Technologies");
    const [filtered, setFiltered] = useState<SkillCardProps[]>(skills)

    useEffect(()=> {
        if(filter === filters[0]){
            setFiltered(skills)
            return
        }
        setFiltered(skills.filter(skill => skill.subtitle === filter))
    }, [filter])

    return (
        <section className="max-w-6xl mx-auto my-12">
            <div className="">
                <h4 className="text-center mx-auto text-dark-400 font-bold max-w-4xl">
                    Browse through my <span className="text-white">toolkit</span> that power my development workflow
                </h4>

                <div className="flex flex-wrap gap-2 w-full mt-8 justify-center">
                    {
                        filters.map(f => (
                            <Badge 
                                key={f} 
                                variant={filter === f ? "default" : "outline"} 
                                className="py-1 border-dark-800 cursor-pointer min-w-fit" 
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </Badge>
                        ))
                    }
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-8">
                {filtered.map((skill, idx) => <SkillCard key={idx} skill={skill}/>)}
            </div>
        </section>
    )
}

type Props = { skill: SkillCardProps }

function SkillCard({ skill }: Props){
    return (
        <Card className="w-full bg-black p-4 border-dark-800 hover:border-dark-700 transition-colors">
            <CardHeader className="flex flex-row gap-4 items-center">
                <div 
                    className="w-10 h-10 border rounded-md grid place-items-center" 
                    style={{ backgroundColor: `${skill.color}20`, borderColor: `${skill.color}40` }}
                >
                    <skill.icon size={18} style={{ color: skill.color }} />
                </div>
                <div>
                    <h5 className="text-white">{skill.title}</h5>
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>{skill.subtitle}</p>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-dark-400 text-sm">{skill.description}</p>
            </CardContent>
        </Card>
    )
}
