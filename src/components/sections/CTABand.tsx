import Link from 'next/link';

interface ContactMethod {
  name: string;
  value: string;
  icon: string;
  link: string;
  description: string;
}

const CTABand = () => {
  const contactMethods: ContactMethod[] = [
    {
      name: 'Email',
      value: 'hello@muhammadasim.dev',
      icon: '✉️',
      link: 'mailto:hello@muhammadasim.dev',
      description: 'Direct communication for project discussions'
    },
    {
      name: 'LinkedIn',
      value: 'muhammadasim',
      icon: '💼',
      link: 'https://linkedin.com/in/muhammadasim',
      description: 'Professional networking and updates'
    },
    {
      name: 'GitHub',
      value: 'muhammadasim',
      icon: '🐙',
      link: 'https://github.com/muhammadasim',
      description: 'View my code and open source contributions'
    }
  ];

  return (
    <section className="py-24 bg-[#0B0F14]">
      <div className="container-custom">
        <div className="card max-w-4xl mx-auto text-center bg-gradient-to-br from-[#111318] to-[#0F1115] border-[#22C55E]/20">
          <div className="space-y-8 p-12">
            {/* Main CTA */}
            <div className="space-y-4">
              <h2 className="font-bold">
                Let's Build <span className="text-[#22C55E]">Something</span> Amazing
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Ready to turn your ideas into reality? Whether it's a web application,
                performance optimization, or a development tool, I'm here to help.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method) => (
                <div key={method.name} className="text-center group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {method.name}
                  </h3>
                  <a
                    href={method.link}
                    target={method.name === 'Email' ? '_self' : '_blank'}
                    rel={method.name === 'Email' ? '' : 'noopener noreferrer'}
                    className="text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 font-medium block mb-2"
                  >
                    {method.value}
                  </a>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/contact" className="btn-primary-lg">
                Start a Project
              </Link>
              <Link href="/projects" className="btn-secondary-lg">
                View My Work
              </Link>
            </div>

            {/* Additional Info */}
            <div className="pt-8 border-t border-[#1F2937]/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="text-center">
                  <div className="text-[#22C55E] font-semibold mb-1">Response Time</div>
                  <div className="text-white/60">Within 24 hours</div>
                </div>
                <div className="text-center">
                  <div className="text-[#14B8A6] font-semibold mb-1">Project Types</div>
                  <div className="text-white/60">Web Apps, APIs, Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-[#8B5CF6] font-semibold mb-1">Availability</div>
                  <div className="text-white/60">Currently accepting projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABand;