import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Détails du Projet - Muhammad Asim',
  description: 'Étude de cas détaillée du projet avec aperçu technique, défis surmontés et résultats obtenus.',
  keywords: ['étude de cas', 'détails projet', 'développement web', 'architecture technique'],
};

interface ProjectDetailProps {
  params: { id: string };
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <Link href="/projets" className="inline-flex items-center text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Project <span className="text-[#22C55E]">Case Study</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Detailed case study for project ID: {id}
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder Content */}
      <div className="container-custom pb-24">
        <div className="card max-w-4xl mx-auto text-center">
          <div className="space-y-8 p-12">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-2xl font-bold text-white">
              Case Study Coming Soon
            </h2>
            <p className="text-white/70 leading-relaxed">
              This project case study is currently being developed. It will include:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Project Overview</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Problem statement & objectives</li>
                  <li>• Constraints & requirements</li>
                  <li>• My role & team structure</li>
                  <li>• Timeline & milestones</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Technical Details</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Tech stack & architecture</li>
                  <li>• Key challenges & solutions</li>
                  <li>• Performance optimizations</li>
                  <li>• Testing & deployment</li>
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/projets" className="btn-secondary">
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}