import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Code, GitBranch, Layers } from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    titleKey: "usesPage.workflow.steps.planning.title",
    descriptionKey: "usesPage.workflow.steps.planning.description",
    icon: Layers,
    tools: ["Notion", "Figma", "Miro"],
    color: "#3B82F6",
  },
  {
    step: "02",
    titleKey: "usesPage.workflow.steps.setup.title",
    descriptionKey: "usesPage.workflow.steps.setup.description",
    icon: Code,
    tools: ["VS Code", "Node.js", "Git"],
    color: "#22C55E",
  },
  {
    step: "03",
    titleKey: "usesPage.workflow.steps.development.title",
    descriptionKey: "usesPage.workflow.steps.development.description",
    icon: GitBranch,
    tools: ["React", "TypeScript", "Tailwind"],
    color: "#EAB308",
  },
  {
    step: "04",
    titleKey: "usesPage.workflow.steps.deployment.title",
    descriptionKey: "usesPage.workflow.steps.deployment.description",
    icon: CheckCircle,
    tools: ["Vercel", "AWS", "Sentry"],
    color: "#EF4444",
  },
];

export default function Workflow() {
  const { t } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto my-16">
      <div className="text-center mb-12">
        <h4 className="text-2xl md:text-3xl font-light text-foreground mb-4">
          {t('usesPage.workflow.title')}
        </h4>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('usesPage.workflow.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflowSteps.map((workflow, index) => (
          <Card
            key={index}
            className="bg-card p-6 border-border group hover:border-muted-foreground transition-colors"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-10 h-10 border rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${workflow.color}20`, // 20% opacity
                    borderColor: `${workflow.color}40`, // 40% opacity
                  }}
                >
                  <workflow.icon size={18} style={{ color: workflow.color }} />
                </div>
                <span
                  className="font-medium text-sm"
                  style={{ color: workflow.color }}
                >
                  {workflow.step}
                </span>
              </div>
              <h5 className="text-lg font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                {t(workflow.titleKey)}
              </h5>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(workflow.descriptionKey)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {workflow.tools.map((tool, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-muted text-muted-foreground"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
