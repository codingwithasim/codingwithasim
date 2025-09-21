'use client';

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";


export default function PhilosophySection() {
    const { t } = useLanguage();
    const {theme} = useTheme();
    
    return (
        <>
            <h4 className="place-self-center py-12 pt-18"> {t('about.philosophy.title')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2  relative">


                <Card className="dark:border-dark-800 order-1 md:order-0 rounded-t-none  md:border-b md:border-l md:rounded-l-lg  md:border-r-0 md:rounded-r-none dark:bg-black">
                    <CardContent className="text-justify text-black/70 dark:text-white/70 py-12  md:py-24">
                        <span className="text-xl font-[300]">
                            {t('about.philosophy.subtitle')}
                        </span>

                        <p className=" text-black/60 dark:text-white/60 font-[250] mt-2  ">
                            {t('about.philosophy.description')}
                        </p>
                    </CardContent>
                </Card>

                <Card className="dark:border-[#464646] h-28 md:h-full rounded-b-none border-b-0 md:rounded-r-lg md:rounded-l-none  md:border-b overflow-hidden">
                    <CardContent className="text-justify h-full relative">
                        <Image src={theme === "dark" ? "/assets/overlay.png" : "/assets/overlay_light.png"} fill alt="Dark overlay" loading="lazy" className="object-cover absolute top-0 bottom-0 left-0 right-0" />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}