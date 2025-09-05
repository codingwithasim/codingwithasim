"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { attachSpotlightTo } from "@/utils/spotlight";
import { useEffect, useRef } from "react";
import { FaCode } from "react-icons/fa6";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineDesktopWindows } from "react-icons/md";



export default function Essentials() {

    return (
        <section className="mx-auto max-w-6xl">
            {/* Main Featured Tool */}
            <Card className="bg-black relative overflow-clip p-6 md:p-8 border-dark-800 hover:border-dark-700 mb-6">
                <CardHeader className="flex flex-row sm:items-center justify-between gap-4 pb-6">
                    <div className="w-14 h-14 text-orange-600 bg-[#c56922]/10 border-dark-800 border rounded-md flex items-center justify-center">
                        <FaCode size={20}/>
                    </div>
                    <div className="text-center grid place-items-center">
                        <h5 className="text-lg md:text-xl font-medium text-white">
                            1+
                        </h5>
                        <span className="text-white/60 text-sm">
                            Year Using
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h5 className="text-xl md:text-2xl font-medium text-white">
                        React + TypeScript
                    </h5>
                    <span className="text-white/70 text-sm md:text-base">The cornerstone of my development workflow</span>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed">
                        React with TypeScript provides the perfect balance of flexibility and type safety. I use it for everything from small components to large-scale applications, leveraging hooks, context, and modern patterns.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {
                            ["Frontend", "Type Safety", "Component-Based", "Modern"].map(
                                (tag, idx)=> {
                                    return(
                                        <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                                    )
                                }
                            )
                        }
                    </div>
                </CardContent>

            </Card>

            {/* Secondary Tools Grid */}
            <div className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black p-6 border-dark-800 hover:border-dark-700">
                    <CardHeader className="flex flex-row sm:items-center justify-between gap-4 pb-6">
                        <div className="w-14 h-14 text-cyan-600 bg-[#0df]/10 border border-dark-800 rounded-md flex items-center justify-center">
                            <HiOutlineLightningBolt size={20}/>
                        </div>
                        <div className="text-center grid place-items-center">
                            <h5 className="text-lg font-medium text-white">
                                &lt; 1
                            </h5>
                            <span className="text-white/60 text-sm">
                                Year Using
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h5 className="text-lg md:text-xl font-medium text-white">
                            Next.js
                        </h5>
                        <span className="text-white/70 text-sm">Full-stack React framework</span>
                        <p className="text-white/50 text-sm leading-relaxed">
                            Next.js provides server-side rendering, static site generation, and full-stack capabilities. Perfect for building performant, SEO-friendly applications with great developer experience.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {
                                ["Full-stack", "SSR/SSG", "Performance", "Production"].map(
                                    (tag, idx)=> {
                                        return(
                                            <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                                        )
                                    }
                                )
                            }
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black p-6 border-dark-800 hover:border-dark-700">
                    <CardHeader className="flex flex-row justify-between gap-4 pb-6">
                        <div className="w-14 h-14 text-green-600 bg-[#0f4]/10 border border-dark-800 rounded-md flex items-center justify-center">
                            <MdOutlineDesktopWindows size={20}/>
                        </div>
                        <div className="text-center grid place-items-center">
                            <h5 className="text-lg font-medium text-white">
                                3+
                            </h5>
                            <span className="text-white/60 text-sm">
                                Years Using
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h5 className="text-lg md:text-xl font-medium text-white">
                            VS Code
                        </h5>
                        <span className="text-white/70 text-sm">My primary development environment</span>
                        <p className="text-white/50 text-sm leading-relaxed">
                            Extensively customized with extensions, themes, and shortcuts. Features like GitHub Copilot, live collaboration, and integrated terminal make it indispensable for my daily workflow.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {
                                ["Editor", "Extensions", "Customizable", "Productivity"].map(
                                    (tag, idx)=> {
                                        return(
                                            <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                                        )
                                    }
                                )
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}