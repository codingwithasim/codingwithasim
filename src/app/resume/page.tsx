'use client';


export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="text-[#22C55E]">Resume</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my professional experience, skills, 
              and achievements in web development and software engineering.
            </p>
            <button
              onClick={handlePrint}
              className="btn-primary mt-8 px-8 py-4 text-lg"
            >
              Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <div className="container-custom pb-24">
        <div className="card max-w-4xl mx-auto bg-white text-black print:shadow-none print:border-none">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Muhammad Asim</h1>
              <p className="text-xl text-gray-600 mb-4">Full-Stack Web Developer</p>
              <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
                <span>📍 Remote</span>
                <span>📧 hello@muhammadasim.dev</span>
                <span>🌐 muhammadasim.dev</span>
                <span>📱 +1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              Experienced full-stack web developer with 5+ years of expertise in building 
              scalable, high-performance web applications. Proven track record of reducing 
              build times by 48% and improving Core Web Vitals by 35%. Passionate about 
              creating exceptional developer experiences and contributing to open source. 
              Skilled in React, Node.js, Python, and modern web technologies.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Frontend</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>React & React Hooks</li>
                  <li>TypeScript & JavaScript</li>
                  <li>Next.js & Vue.js</li>
                  <li>Tailwind CSS & SASS</li>
                  <li>HTML5 & CSS3</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Backend</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Node.js & Express</li>
                  <li>Python & FastAPI</li>
                  <li>Go & gRPC</li>
                  <li>PostgreSQL & MongoDB</li>
                  <li>Redis & Elasticsearch</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">DevOps & Tools</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Docker & Kubernetes</li>
                  <li>AWS & Cloud Services</li>
                  <li>Git & GitHub Actions</li>
                  <li>CI/CD Pipelines</li>
                  <li>Linux & Shell Scripting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">Senior Full-Stack Developer</h3>
                  <span className="text-gray-600 font-medium">2023 - Present</span>
                </div>
                <p className="text-lg text-gray-700 mb-2">Freelance Developer</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Built scalable web applications for clients worldwide, handling 10k+ concurrent users</li>
                  <li>• Reduced build times by 48% and improved Core Web Vitals by 35% for enterprise clients</li>
                  <li>• Delivered 12+ projects on time and within budget, maintaining 99.9% client satisfaction</li>
                  <li>• Implemented performance monitoring and optimization strategies</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">Senior Frontend Developer</h3>
                  <span className="text-gray-600 font-medium">2021 - 2023</span>
                </div>
                <p className="text-lg text-gray-700 mb-2">TechCorp</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Led frontend development for enterprise applications serving 100k+ users</li>
                  <li>• Managed team of 5 developers, providing mentorship and code reviews</li>
                  <li>• Implemented performance monitoring and reduced bundle size by 40%</li>
                  <li>• Collaborated with UX/UI teams to improve user experience</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">Full-Stack Developer</h3>
                  <span className="text-gray-600 font-medium">2019 - 2021</span>
                </div>
                <p className="text-lg text-gray-700 mb-2">StartupXYZ</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Built and scaled web applications from MVP to production</li>
                  <li>• Improved API response time by 60% through optimization</li>
                  <li>• Implemented CI/CD pipeline and automated testing</li>
                  <li>• Built 3 core products that generated $2M+ in revenue</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Projects</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">E-commerce Platform</h3>
                <p className="text-gray-600 mb-2">React, Node.js, PostgreSQL, Redis</p>
                <p className="text-gray-700">
                  High-performance e-commerce platform handling 10k+ concurrent users with 99.9% uptime. 
                  Implemented real-time inventory management and payment processing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Developer Dashboard</h3>
                <p className="text-gray-600 mb-2">Vue.js, Python, MongoDB, Docker</p>
                <p className="text-gray-700">
                  Analytics dashboard that reduced development time by 40% for engineering teams. 
                  Features include performance metrics, error tracking, and deployment monitoring.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Chat System</h3>
                <p className="text-gray-600 mb-2">WebSocket, Node.js, Redis, Socket.io</p>
                <p className="text-gray-700">
                  Scalable real-time chat system supporting 100k+ concurrent connections. 
                  Includes message encryption, file sharing, and user presence features.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Certifications</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Bachelor of Computer Science</h3>
                <p className="text-gray-600">University of Technology</p>
                <p className="text-gray-700">Graduated with honors, specialized in Software Engineering</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• AWS Certified Developer Associate</li>
                  <li>• Google Cloud Professional Developer</li>
                  <li>• MongoDB Certified Developer</li>
                  <li>• React Advanced Patterns Certification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          body { background: white !important; }
          .card { box-shadow: none !important; border: none !important; }
        }
      `}</style>
    </div>
  );
}