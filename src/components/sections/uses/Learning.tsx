import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Brain, Code2, Rocket } from "lucide-react";

type LearningStatus = 'inProgress' | 'starting' | 'planning';
type LearningCategory = 'framework' | 'language' | 'database';

const statusColorMap: Record<LearningStatus, string> = {
    inProgress: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20",
    starting: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
    planning: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
};

const statusLabelKeys: Record<LearningStatus, string> = {
    inProgress: "usesPage.learning.status.inProgress",
    starting: "usesPage.learning.status.starting",
    planning: "usesPage.learning.status.planning",
};

const categoryLabelKeys: Record<LearningCategory, string> = {
    framework: "usesPage.learning.categories.framework",
    language: "usesPage.learning.categories.language",
    database: "usesPage.learning.categories.database",
};

const currentLearning = [
    {
      title: "Next.js",
      status: "inProgress" as const,
      descriptionKey: "usesPage.learning.items.next.description",
      progress: 75,
      icon: Code2,
      category: "framework" as const
    },
    {
      title: "TypeScript",
      status: "inProgress" as const,
      descriptionKey: "usesPage.learning.items.ts.description",
      progress: 55,
      icon: Rocket,
      category: "language" as const
    },
    {
      title: "Postgres",
      status: "inProgress" as const,
      descriptionKey: "usesPage.learning.items.postgres.description",
      progress: 35,
      icon: Brain,
      category: "database" as const
    }
  ];

const getStatusColor = (status: LearningStatus) => statusColorMap[status];

export default function Learning() {
    const { t } = useLanguage();

    return (
        <section className="max-w-6xl mx-auto my-16">
            <div className="text-center mb-12">
                <h4 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                    {t('usesPage.learning.title')}
                </h4>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t('usesPage.learning.description')}
                </p>
            </div>

            <div className="mb-12">
                <h5 className="text-xl font-medium text-foreground mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-[#22C55E]" />
                    {t('usesPage.learning.active')}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentLearning.map((item, index) => (
                        <Card key={index} className="bg-card p-6 border-border hover:border-muted-foreground transition-colors">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                                            <item.icon size={16} className="text-muted-foreground" />
                                        </div>
                                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                                            {t(statusLabelKeys[item.status])}
                                        </Badge>
                                    </div>
                                    <span className="text-muted-foreground/60 text-xs">{item.progress}%</span>
                                </div>
                                <h5 className="text-lg font-medium text-foreground">
                                    {item.title}
                                </h5>
                                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                                    <div 
                                        className="bg-[#22C55E] h-1.5 rounded-full transition-all duration-300"
                                        style={{ width: `${item.progress}%` }}
                                    ></div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                                    {t(item.descriptionKey)}
                                </p>
                                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                                    {t(categoryLabelKeys[item.category])}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
