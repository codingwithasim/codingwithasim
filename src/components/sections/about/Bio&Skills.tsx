'use client';

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

type SkillProps = {
    name: string,
    level: number
  }[]

export default function BioSkills() {
    const { t } = useLanguage();

    const techSkills: SkillProps = [
        { name: t('about.skills.webBasics'), level: 90 },
        { name: t('about.skills.react'), level: 85 },
        { name: t('about.skills.nextjs'), level: 75 },
        { name: t('about.skills.tailwind'), level: 70 },
        { name: t('about.skills.nodejs'), level: 65 },
        { name: t('about.skills.git'), level: 75 },
      ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <Card className="border-dark-800 border-b-0 rounded-b-none md:border-b md:border-l md:rounded-l-lg  md:border-r-0 md:rounded-r-none bg-black">
              <CardTitle className="px-6 py-12">
                {t('about.bio.title')}
              </CardTitle>
              <CardContent className="text-justify text-gray-200 flex flex-col gap-8">
                <p>
                  {t('about.bio.paragraph1')}
                </p>
                
                <p>
                   {t('about.bio.paragraph2')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-dark-800 rounded-t-none md:rounded-r-lg md:rounded-l-none bg-black">
              <CardTitle className="px-6 py-12">
                {t('about.skills.title')}
              </CardTitle>
              <CardContent className="text-justify">
                <ul className="flex f flex-col">
                    {
                      techSkills.map(skill => {
                        return (
                          <li key={skill.name} className="py-3 flex flex-col text-sm gap-4 group">
                            <div className="flex items-center gap-4">
                              <span className="text-gray-300 group-hover:text-white w-[180px]">{skill.name}</span>
                              <Progress indicatorStyle="bg-[#717171] group-hover:bg-white transition-colors" value={skill.level} max={100}/>
                              <span className="text-gray-300 group-hover:text-white w-[100px]">{skill.level}%</span>
                            </div>
                          </li>
                        )
                      })
                    }
                </ul>
              </CardContent>
            </Card>
        </div>
    )
} 