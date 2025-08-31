'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [displayedCode, setDisplayedCode] = useState('');

  const codeSnippet = `const developer = {
  name: "Muhammad Asim",
  role: "Web Developer",
  specialty: "React, Performance & DX",
  location: "Remote",
  available: true
};

function buildSomethingAmazing() {
  return "Let's create incredible web experiences!";
}

// Currently working on:
// Building modern web applications
// Performance optimization and UX
// Open source contributions

console.log(buildSomethingAmazing());`;

  useEffect(() => {
    const lines = codeSnippet.split('\n');
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < lines.length-1) {
        setDisplayedCode(prev => prev + lines[currentIndex] + '\n');
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-[#0B0F14] to-[#0F1115]">
      <div className="container-custom">
        <div className="grid-12 items-center">
          {/* Left Column - Intro (6 columns) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6">
              <h2 className="text-lg font-normal">
                Hi, I'm{' '}
                <span className="text-white">Asim</span>
              </h2>
              <h2 className="text-2xl md:text-3xl bg-clip-text font-medium leading-tight text-green-400">
                A <span>Web Developer</span>
              </h2>
            </div>
            
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
              I build fast, accessible web applications that developers love to use.
              Reduced build times by 48% and improved Core Web Vitals by 35% for enterprise clients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects" className="btn-primary-lg">
                View Projects
              </Link>
              <Link href="/contact" className="btn-secondary-lg">
                Get in Touch
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#22C55E]">48%</div>
                <div className="text-sm text-white/60">Build Time Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#14B8A6]">35%</div>
                <div className="text-sm text-white/60">Performance Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#8B5CF6]">12+</div>
                <div className="text-sm text-white/60">Projects Delivered</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Code (6 columns) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="code-block p-6 font-mono text-sm leading-relaxed">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-white/40 text-xs">portfolio.js</span>
                </div>
                
                <pre className="text-white/90 overflow-hidden">
                  <code>
                    {displayedCode.split('\n').map((line, index) => {
                      if (line.includes('const developer = {')) {
                        return <div key={index}><span className="text-[#8B5CF6]">const</span> <span className="text-[#22C55E]">developer</span> = {`{`}</div>;
                      } else if (line.includes('name:')) {
                        return <div key={index}><span className="text-[#14B8A6] ml-4">name:</span> <span className="text-[#F59E0B]">"Muhammad Asim"</span>,</div>;
                      } else if (line.includes('role:')) {
                        return <div key={index}><span className="text-[#14B8A6] ml-4">role:</span> <span className="text-[#F59E0B]">"Web Developer"</span>,</div>;
                      } else if (line.includes('specialty:')) {
                        return <div key={index}><span className="text-[#14B8A6] ml-4">specialty:</span> <span className="text-[#F59E0B]">"React, Performance & DX"</span>,</div>;
                      } else if (line.includes('location:')) {
                        return <div key={index}><span className="text-[#14B8A6] ml-4">location:</span> <span className="text-[#F59E0B]">"Remote"</span>,</div>;
                      } else if (line.includes('available:')) {
                        return <div key={index}><span className="text-[#14B8A6] ml-4">available:</span> <span className="text-[#22C55E]">true</span></div>;
                      } else if (line.includes('};')) {
                        return <div key={index}>{`};`}</div>;
                      } else if (line.includes('function buildSomethingAmazing()')) {
                        return <div key={index}><span className="text-[#8B5CF6]">function</span> <span className="text-[#22C55E]">buildSomethingAmazing</span>() {`{`}</div>;
                      } else if (line.includes('return "Let\'s create incredible web experiences!";')) {
                        return <div key={index}><span className="text-[#8B5CF6] ml-4">return</span> <span className="text-[#F59E0B]">"Let's create incredible web experiences!"</span>;</div>;
                      } else if (line.includes('}')) {
                        return <div key={index}>{`}`}</div>;
                      } else if (line.includes('// Currently working on:')) {
                        return <div key={index} className="text-[#6B7280]">// Currently working on:</div>;
                      } else if (line.includes('// Building modern web applications')) {
                        return <div key={index} className="text-[#6B7280] ml-4">// Building modern web applications</div>;
                      } else if (line.includes('// Performance optimization and UX')) {
                        return <div key={index} className="text-[#6B7280] ml-4">// Performance optimization and UX</div>;
                      } else if (line.includes('// Open source contributions')) {
                        return <div key={index} className="text-[#6B7280] ml-4">// Open source contributions</div>;
                      } else if (line.includes('console.log(buildSomethingAmazing());')) {
                        return <div key={index}><span className="text-[#8B5CF6]">console</span>.<span className="text-[#22C55E]">log</span>(<span className="text-[#22C55E]">buildSomethingAmazing</span>());</div>;
                      } else {
                        return <div key={index}>{line}</div>;
                      }
                    })}
                  </code>
                  <span className="inline-block w-2 h-5 bg-[#22C55E] ml-1 animate-pulse"></span>
                </pre>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#22C55E]/20 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-[#14B8A6]/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;