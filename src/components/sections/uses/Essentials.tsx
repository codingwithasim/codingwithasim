"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { attachSpotlightTo } from "@/utils/spotlight";
import { useEffect, useRef } from "react";
import { FaCode } from "react-icons/fa6";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Essentials() {
    const { t } = useLanguage();

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
                            {t('usesPage.react.yearUsing')}
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h5 className="text-xl md:text-2xl font-medium text-white">
                        {t('usesPage.react.title')}
                    </h5>
                    <span className="text-white/70 text-sm md:text-base">{t('usesPage.react.subtitle')}</span>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed">
                        {t('usesPage.react.description')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {
                            [t('usesPage.react.tags.frontend'), t('usesPage.react.tags.typeSafety'), t('usesPage.react.tags.componentBased'), t('usesPage.react.tags.modern')].map(
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
                                {t('usesPage.nextjs.yearUsing')}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h5 className="text-lg md:text-xl font-medium text-white">
                            {t('usesPage.nextjs.title')}
                        </h5>
                        <span className="text-white/70 text-sm">{t('usesPage.nextjs.subtitle')}</span>
                        <p className="text-white/50 text-sm leading-relaxed">
                            {t('usesPage.nextjs.description')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {
                                [t('usesPage.nextjs.tags.fullstack'), t('usesPage.nextjs.tags.ssr'), t('usesPage.nextjs.tags.performance'), t('usesPage.nextjs.tags.production')].map(
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
                                {t('usesPage.vscode.yearUsing')}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h5 className="text-lg md:text-xl font-medium text-white">
                            {t('usesPage.vscode.title')}
                        </h5>
                        <span className="text-white/70 text-sm">{t('usesPage.vscode.subtitle')}</span>
                        <p className="text-white/50 text-sm leading-relaxed">
                            {t('usesPage.vscode.description')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {
                                [t('usesPage.vscode.tags.editor'), t('usesPage.vscode.tags.extensions'), t('usesPage.vscode.tags.customizable'), t('usesPage.vscode.tags.productivity')].map(
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