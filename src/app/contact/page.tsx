'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      name: 'Email',
      value: 'hello@muhammadasim.dev',
      description: 'Direct communication for project discussions',
      icon: '✉️',
      link: 'mailto:hello@muhammadasim.dev'
    },
    {
      name: 'GitHub',
      value: 'muhammadasim',
      description: 'View my code and open source contributions',
      icon: '🐙',
      link: 'https://github.com/muhammadasim'
    },
    {
      name: 'LinkedIn',
      value: 'muhammadasim',
      description: 'Professional networking and updates',
      icon: '💼',
      link: 'https://linkedin.com/in/muhammadasim'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Stay <span className="text-[#22C55E]">Connected</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to start a project or just want to discuss technology?
              I'm always open to new opportunities and collaborations.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#111318] border border-[#1F2937] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#22C55E] transition-colors duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/80 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#111318] border border-[#1F2937] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#22C55E] transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/80 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#111318] border border-[#1F2937] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#22C55E] transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or what you'd like to discuss..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">
              Get in Touch
            </h2>
            
            <div className="space-y-8">
              {contactMethods.map((method) => (
                <div key={method.name} className="flex items-start space-x-4">
                  <div className="text-3xl">{method.icon}</div>
                  <div className="flex-1">
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
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 bg-[#111318] border border-[#1F2937] rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                What to Expect
              </h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
                  <span>Free initial consultation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
                  <span>Detailed project proposal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
                  <span>Transparent pricing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}