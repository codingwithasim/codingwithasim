import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";

type SkillProps = {
    name: string,
    level: number
  }[]

export default function BioSkills() {

    const techSkills: SkillProps = [
        { name: "Web basics", level: 80 },
        { name: "React", level: 75 },
        { name: "Next.js", level: 70 },
        { name: "Tailwind CSS", level: 70 },
        { name: "Node.js", level: 65 },
        { name: "Git/GitHub", level: 75 },
      ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <Card className="border-[#464646] border-b-0 rounded-b-none md:border-b md:border-l md:rounded-l-lg  md:border-r-0 md:rounded-r-none bg-black">
              <CardTitle className="px-6 py-12">
                Who I Am
              </CardTitle>
              <CardContent className="text-justify text-gray-200 flex flex-col gap-8">
                <p>
                  I'm <span className="font-semibold">Muhammad Asim</span>, a web developer with <span className="font-semibold">2+ years of experience</span> building applications that developers love to use. My journey began with curiosity about how things work in Android, which led me to discover web development.
                </p>
                
                <p>
                   I've worked with <span className="font-semibold">HTML, CSS, JavaScript, PHP</span>, and taught myself modern frameworks like <span className="font-semibold">React, Next.js, Tailwind, and Node.js</span>. I focus on creating software that balances <span className="font-semibold">technical performance with user needs</span>, ensuring every project is <span className="font-semibold">fast, maintainable, and user-friendly</span>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#464646] rounded-t-none md:rounded-r-lg md:rounded-l-none bg-black">
              <CardTitle className="px-6 py-12">
                Technical Expertise
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