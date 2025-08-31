import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  bgColor: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Engineering Manager',
      company: 'TechCorp',
      content: 'Muhammad delivered exceptional results, reducing our build time by 48% and improving overall developer experience. His attention to performance and clean code is outstanding.',
      avatar: 'SC',
      bgColor: 'bg-gradient-to-br from-[#22C55E]/20 to-[#16A34A]/20'
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      role: 'CTO',
      company: 'StartupXYZ',
      content: 'Working with Muhammad was a game-changer. He built a scalable backend that handles 50k+ users with 99.9% uptime. Highly recommend for any technical project.',
      avatar: 'AR',
      bgColor: 'bg-gradient-to-br from-[#14B8A6]/20 to-[#0D9488]/20'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Product Manager',
      company: 'DevTools Inc',
      content: 'Muhammad\'s expertise in React and performance optimization helped us create a dashboard that developers actually love to use. Great communication and delivery.',
      avatar: 'EW',
      bgColor: 'bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20'
    }
  ];

  return (
    <section className="py-24 bg-[#0F1115]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-[#22C55E]">Testimonials</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Feedback from clients and colleagues about the quality of work, 
            communication, and impact delivered on projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card group hover:scale-[1.02] transition-all duration-300">
              <div className="space-y-6">
                {/* Quote Icon */}
                <div className="text-4xl text-[#22C55E]/30">"</div>

                {/* Testimonial Content */}
                <p className="text-white/80 leading-relaxed text-lg">
                  {testimonial.content}
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-4">
                  <div className={`w-12 h-12 rounded-full ${testimonial.bgColor} border border-[#1F2937] flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-white/60 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-white/60">
            <span>Want to work together?</span>
            <a href="/contact" className="text-[#22C55E] hover:text-[#16A34A] transition-colors duration-200 font-medium">
              Let's discuss your project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;