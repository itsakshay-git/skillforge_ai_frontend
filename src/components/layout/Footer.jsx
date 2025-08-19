import React from 'react'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          {/* Logo and Brand Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white">
                    <path
                      d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                SkillForge AI
              </h2>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Empowering developers and professionals with cutting-edge AI tools for enhanced productivity and creativity.
            </p>
          </div>

          {/* AI Tools Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {[
              "Code Explainer",
              "Code to Quiz",
              "Resume Analyzer",
              "Email Assistant",
              "Job Matcher"
            ].map((tool, index) => (
              <span
                key={index}
                className="group px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4 text-white">About SkillForge AI</h3>
              <p className="text-gray-300 leading-relaxed">
                We're building the future of AI-powered productivity tools, helping professionals and developers achieve more with intelligent automation.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Documentation", href: "#" },
                  { name: "API Reference", href: "#" },
                  { name: "Support", href: "#" }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4 text-white">Get in Touch</h3>
              <div className="space-y-2 text-gray-300">
                <p>Have questions or suggestions?</p>
                <p className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
                  contact@skillforge.ai
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>

              <p className="text-gray-400 text-sm text-center">
                © 2024 SkillForge AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}