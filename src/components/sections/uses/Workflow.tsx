import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Code, GitBranch, Layers, TestTube } from "lucide-react";

export default function Workflow() {
  const workflowSteps = [
    {
      step: "01",
      title: "Planning & Research",
      description:
        "Understanding requirements, researching solutions, and creating project architecture",
      icon: Layers,
      tools: ["Notion", "Figma", "Miro"],
      color: "#3B82F6", // Blue
    },
    {
      step: "02",
      title: "Environment Setup",
      description:
        "Setting up development environment, dependencies, and initial project structure",
      icon: Code,
      tools: ["VS Code", "Node.js", "Git"],
      color: "#22C55E", // Green
    },
    {
      step: "03",
      title: "Development",
      description:
        "Writing code with TDD approach, implementing features iteratively",
      icon: GitBranch,
      tools: ["React", "TypeScript", "Tailwind"],
      color: "#EAB308", // Yellow
    },
    {
      step: "04",
      title: "Deployment",
      description:
        "Building, deploying, and monitoring applications in production",
      icon: CheckCircle,
      tools: ["Vercel", "AWS", "Sentry"],
      color: "#EF4444", // Red
    },
  ];

  return (
    <section className="max-w-6xl mx-auto my-16">
      <div className="text-center mb-12">
        <h4 className="text-2xl md:text-3xl font-light text-white mb-4">
          Development Workflow
        </h4>
        <p className="text-white/60 max-w-2xl mx-auto">
          My step-by-step approach to building high-quality applications from
          concept to deployment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflowSteps.map((workflow, index) => (
          <Card
            key={index}
            className="bg-black p-6 border-dark-800 group hover:border-dark-700 transition-colors"
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
              <h5 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors">
                {workflow.title}
              </h5>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/60 text-sm leading-relaxed">
                {workflow.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {workflow.tools.map((tool, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-dark-900 text-white/70"
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
