import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Brain, Code2, Globe, Rocket, Sparkles } from "lucide-react";

export default function Learning() {
    const currentLearning = [
        {
          title: "Next.js",
          status: "In Progress",
          description: "Exploring advanced concepts like server actions, streaming, and app router.",
          progress: 75,
          icon: Code2,
          category: "Framework"
        },
        {
          title: "TypeScript",
          status: "In Progress",
          description: "Improving type safety, generics, and advanced utility types for scalable apps.",
          progress: 55,
          icon: Rocket,
          category: "Language"
        },
        {
          title: "Postgres",
          status: "In Progress",
          description: "Learning advanced querying, indexing, and optimization techniques.",
          progress: 35,
          icon: Brain,
          category: "Database"
        }
      ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Progress": return "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20";
            case "Starting": return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
            case "Planning": return "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20";
            default: return "bg-muted/10 text-muted-foreground border-border";
        }
    };

    return (
        <section className="max-w-6xl mx-auto my-16">
            <div className="text-center mb-12">
                <h4 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                    Continuous Learning
                </h4>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Staying current with emerging technologies and deepening expertise in core areas
                </p>
            </div>

            {/* Current Learning Projects */}
            <div className="mb-12">
                <h5 className="text-xl font-medium text-foreground mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-[#22C55E]" />
                    Active Learning
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
                                            {item.status}
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
                                    {item.description}
                                </p>
                                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                                    {item.category}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Future Interests not sure what to put yet*/}
            {/* <Card className="bg-black p-8 border-dark-800">
                <CardHeader className="pb-6">
                    <h5 className="text-xl font-medium text-white flex items-center gap-2">
                        <Sparkles size={20} className="text-[#8B5CF6]" />
                        Areas of Interest
                    </h5>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {interests.map((interest, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-dark-900/50 hover:bg-dark-900 transition-colors">
                                <div className="w-2 h-2 bg-[#8B5CF6] rounded-full flex-shrink-0"></div>
                                <span className="text-white/70 text-sm">{interest}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card> */}
        </section>
    );
}