import Link from 'next/link';

const AboutPreview = () => {
  return (
    <section className="py-24 bg-[#0B0F14]">
      <div className="container-custom">
        <div className="grid-12 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-bold">
              About <span className="text-[#22C55E]">Me</span>
            </h2>
            
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                I'm a passionate web developer with over 5 years of experience building
                applications that developers actually want to use.
              </p>
              <p>
                My philosophy focuses on clean code, performance optimization,
                and creating intuitive developer experiences that reduce friction.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open source,
                writing technical articles, or exploring new technologies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/about" className="btn-secondary">
                Read Full Story
              </Link>
              <Link href="/resume" className="btn-ghost">
                View Resume
              </Link>
            </div>
          </div>

          {/* Right Column - Portrait Vignette */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Portrait Circle */}
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#22C55E]/20 to-[#14B8A6]/20 border-2 border-[#22C55E]/30 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for actual portrait */}
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#1F2937] to-[#111318] flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/20">👨‍💻</div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-[#22C55E]/40 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 border border-[#14B8A6]/40 rounded-full opacity-60 animate-pulse delay-700"></div>
                <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#8B5CF6]/30 rounded-full opacity-60 animate-pulse delay-1000"></div>
              </div>

              {/* Background Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 border border-[#22C55E]/10 rounded-full opacity-30"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-[#14B8A6]/10 rounded-full opacity-30"></div>
              
              {/* Code Snippet Overlay */}
              <div className="absolute -bottom-4 -right-4 w-32 bg-[#111318] border border-[#1F2937] rounded-lg p-3 text-xs font-mono text-white/70 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="text-[#22C55E]">const</div>
                <div className="text-white/90">developer = {`{`}</div>
                <div className="text-[#14B8A6] ml-2">passion:</div>
                <div className="text-white/90 ml-2">true</div>
                <div className="text-white/90">{`}`}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-[#1F2937]/30">
          {[
            { label: 'Years of Experience', value: '5+' },
            { label: 'Projects Delivered', value: '25+' },
            { label: 'Open Source Contributions', value: '50+' },
            { label: 'Happy Clients', value: '15+' }
          ].map((fact, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-[#22C55E] mb-2">{fact.value}</div>
              <div className="text-white/60 text-sm">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;