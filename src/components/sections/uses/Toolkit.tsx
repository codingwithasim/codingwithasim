"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code2, Database, Figma, FileText, GitBranch, Github, Headphones, Keyboard, Monitor, Mouse, Paintbrush, Palette, Type, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { TbApi } from "react-icons/tb";
import { useLanguage } from "@/contexts/LanguageContext";

const filterOptions = [
    { key: 'all', labelKey: 'usesPage.toolkit.filters.all' },
    { key: 'core', labelKey: 'usesPage.toolkit.filters.core' },
    { key: 'devTools', labelKey: 'usesPage.toolkit.filters.devTools' },
    { key: 'productivity', labelKey: 'usesPage.toolkit.filters.productivity' },
    { key: 'hardware', labelKey: 'usesPage.toolkit.filters.hardware' },
] as const;

type FilterOptions = typeof filterOptions[number];
type FilterTypes = FilterOptions['key'];
type CategoryFilter = Exclude<FilterTypes, 'all'>;

type SkillCardProps = {
    title: string,
    category: CategoryFilter,
    descriptionKey: string,
    icon: IconType,
    color: string
}

const categoryLabelKeys: Record<CategoryFilter, string> = {
    core: 'usesPage.toolkit.filters.core',
    devTools: 'usesPage.toolkit.filters.devTools',
    productivity: 'usesPage.toolkit.filters.productivity',
    hardware: 'usesPage.toolkit.filters.hardware',
};

const skills: SkillCardProps[] = [
    { title: "React", category: "core", descriptionKey: "usesPage.toolkit.skills.react.description", icon: Code2, color: "#3B82F6" },
    { title: "Next.js", category: "core", descriptionKey: "usesPage.toolkit.skills.next.description", icon: Zap, color: "#22C55E" },
    { title: "Tailwind CSS", category: "core", descriptionKey: "usesPage.toolkit.skills.tailwind.description", icon: Palette, color: "#FACC15" },
    { title: "Node.js", category: "core", descriptionKey: "usesPage.toolkit.skills.node.description", icon: Database, color: "#10B981" },
    { title: "TypeScript", category: "core", descriptionKey: "usesPage.toolkit.skills.ts.description", icon: Type, color: "#2563EB" },
    { title: "GitHub", category: "core", descriptionKey: "usesPage.toolkit.skills.github.description", icon: Github, color: "#6B7280" },
    { title: "Git", category: "devTools", descriptionKey: "usesPage.toolkit.skills.git.description", icon: GitBranch, color: "#F97316" },
    { title: "VS Code", category: "devTools", descriptionKey: "usesPage.toolkit.skills.vscode.description", icon: Monitor, color: "#6366F1" },
    { title: "Postman", category: "devTools", descriptionKey: "usesPage.toolkit.skills.postman.description", icon: Code2, color: "#FF6C37" },
    { title: "REST Client", category: "devTools", descriptionKey: "usesPage.toolkit.skills.restclient.description", icon: TbApi, color: "#8B5CF6" },
    { title: "Figma", category: "productivity", descriptionKey: "usesPage.toolkit.skills.figma.description", icon: Figma, color: "#F24E1E" },
    { title: "Notion", category: "productivity", descriptionKey: "usesPage.toolkit.skills.notion.description", icon: FileText, color: "#0F172A" },
    { title: "Canva", category: "productivity", descriptionKey: "usesPage.toolkit.skills.canva.description", icon: Paintbrush, color: "#EC4899" },
    { title: "Keychron K3", category: "hardware", descriptionKey: "usesPage.toolkit.skills.keychron.description", icon: Keyboard, color: "#F43F5E" },
    { title: "Logitech MX Master", category: "hardware", descriptionKey: "usesPage.toolkit.skills.logitech.description", icon: Mouse, color: "#8B5CF6" },
    { title: "AirPods Pro", category: "hardware", descriptionKey: "usesPage.toolkit.skills.airpods.description", icon: Headphones, color: "#3B82F6" }
];

export default function Toolkit() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<FilterTypes>("core");
    const [filtered, setFiltered] = useState<SkillCardProps[]>(skills.filter(skill => skill.category === "core"));

    useEffect(() => {
        if (filter === 'all') {
            setFiltered(skills);
            return;
        }
        setFiltered(skills.filter(skill => skill.category === filter));
    }, [filter]);

    return (
        <section className="max-w-6xl mx-auto my-12">
            <div className="">
                <h4 className="text-center mx-auto text-muted-foreground font-bold max-w-4xl">
                    {t('usesPage.toolkit.heading')}
                </h4>

                <div className="flex flex-wrap gap-2 w-full mt-8 justify-center">
                    {
                        filterOptions.map(option => (
                            <Badge 
                                key={option.key} 
                                variant={filter === option.key ? "default" : "outline"} 
                                className="py-1 border-border cursor-pointer min-w-fit" 
                                onClick={() => setFilter(option.key)}
                            >
                                {t(option.labelKey)}
                            </Badge>
                        ))
                    }
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-8">
                {filtered.map((skill, idx) => (
                    <SkillCard 
                        key={`${skill.title}-${idx}`} 
                        skill={skill}
                        categoryLabel={t(categoryLabelKeys[skill.category])}
                        description={t(skill.descriptionKey)}
                    />
                ))}
            </div>
        </section>
    )
}

type SkillCardComponentProps = { 
    skill: SkillCardProps;
    categoryLabel: string;
    description: string;
}

function SkillCard({ skill, categoryLabel, description }: SkillCardComponentProps){
    return (
        <Card className="w-full bg-card p-4 border-border hover:border-muted-foreground transition-colors">
            <CardHeader className="flex flex-row gap-4 items-center">
                <div 
                    className="w-10 h-10 border rounded-md grid place-items-center" 
                    style={{ backgroundColor: `${skill.color}20`, borderColor: `${skill.color}40` }}
                >
                    <skill.icon size={18} style={{ color: skill.color }} />
                </div>
                <div>
                    <h5 className="text-foreground">{skill.title}</h5>
                    <p className="text-sm text-muted-foreground">{categoryLabel}</p>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground text-sm">{description}</p>
            </CardContent>
        </Card>
    )
}
