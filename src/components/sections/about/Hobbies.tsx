'use client';

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Hobbies() {
    const { t } = useLanguage();
    
    return (
        <div className="flex flex-col items-center py-24 overflow-hidden">
            <h4>{t('about.hobbies.title')}</h4>
            <Card className="flex flex-col items-center py-12 gap-4 w-full max-w-7xl text-center dark:bg-black mt-6 dark:border-dark-800">
            <div className="border-t w-2/3 flex justify-center rounded-md border-b border-dark-800">
            <Image 
                width={300}
                height={42}
                src={"/assets/giphy_2.gif"} 
                alt="Minecraft logo" 
                loading="lazy"
                className="opacity-50"
                />

            <Image 
                width={300}
                height={42}
                src={"/assets/giphy.gif"} 
                alt="Minecraft logo" 
                loading="lazy"
                />
        
            <Image 
                width={300}
                height={42}
                src={"/assets/giphy_3.gif"} 
                alt="Minecraft logo" 
                loading="lazy"
                className="opacity-50"
                />
            </div>

            <span className="max-w-3xl text-black/60 dark:text-white/60">
                {t('about.hobbies.description')} creepers{" "}
                <Image src={"/assets/creeper_head.png"} alt="Creeper head" width={22} height={22} loading="lazy" className="inline-block"/>
                {" "}{t('about.hobbies.descriptionEnd')}
            </span>
            </Card>
        </div>
    )
}