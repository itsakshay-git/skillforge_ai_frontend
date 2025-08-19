import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import bgImage from "@/assets/skillai.png";
import { testimonials, tools } from "@/constant";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/auth/AuthModal";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Hero Section */}
        <div className="px-4 sm:px-8 lg:px-20 flex flex-1 justify-center py-8 sm:py-12">
          <div className="flex flex-col w-full max-w-7xl mx-auto">
            <div className="md:@container">
              <div className="sm:w-full">
                <div
                  className="flex sm:w-full md:min-h-[520px] flex-col gap-8 bg-cover bg-center bg-no-repeat justify-center p-6 sm:p-16 lg:p-20 rounded-2xl relative overflow-hidden shadow-2xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(59,130,246,0.9), rgba(147,51,234,0.8), rgba(0,0,0,0.7)), url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Floating elements for modern look */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-blue-400/20 rounded-full blur-lg"></div>

                  <div className="flex flex-col gap-4 p-2 sm:p-0 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full w-fit border border-white/30">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-white/90 text-xs font-medium">AI-Powered Platform</span>
                    </div>

                    <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                      Explore Our{" "}
                      <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                        AI Tools
                      </span>
                    </h1>
                    <h2 className="text-white/90 text-sm sm:text-lg lg:text-xl font-normal max-w-2xl leading-relaxed">
                      Unlock the power of artificial intelligence with our suite of tools designed to enhance your productivity and creativity.
                    </h2>
                  </div>

                  {isAuthenticated ? (
                    <Link
                      to="/resume-optimizer"
                      className="group relative inline-flex w-fit items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                    >
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  ) : (
                    <div
                      onClick={() => setShowAuthModal(true)}
                      className="group cursor-pointer inline-flex w-fit items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105"
                    >
                      <span className="whitespace-nowrap">Please sign in to access our AI tools</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Why Choose Section */}
            <section className="px-0 sm:px-4 pb-8 pt-16 rounded-xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                  <span className="text-blue-600 font-semibold text-sm">Why Choose Us</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Experience the{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Benefits
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Discover how our AI tools can transform your work and personal life with cutting-edge technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    title: 'Save Time',
                    desc: 'Our AI tools help you accomplish tasks faster, freeing up your time for other important activities.',
                    icon: (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M128,24A104,104,0,1,0,232,128A104.11,104.11,0,0,0,128,24Zm0,192A88,88,0,1,1,216,128,88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    title: 'Improve Efficiency',
                    desc: 'Streamline your workflow and achieve more with less effort using our intelligent tools.',
                    icon: (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    title: 'Boost Creativity',
                    desc: 'Unlock new possibilities and enhance your creative output with the power of AI.',
                    icon: (
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z" />
                        </svg>
                      </div>
                    )
                  }
                ].map((feature, index) => (
                  <div key={index} className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-4">{feature.icon}</div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Tools */}
            <section className="px-0 sm:px-4 pb-8 pt-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Featured{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Tools
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our most popular AI-powered solutions designed to enhance your productivity
                </p>
              </div>

              <div className="flex justify-center overflow-x-auto scrollbar-hide gap-6 pb-6">
                {[
                  {
                    title: "Resume Optimizer",
                    desc: "Get instant feedback on your resume to improve your chances of landing your dream job.",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK5INgDZwu5inqZjVyc--WBJkaQtYZ-Fnty771yMtHBoQO_S0aK0Fct4ZXYnZkvKhYU9Dg8vW0OswpknniHjziRydRuvnkIyMAZxputcwcx0dNnMD5y3DF8wlFiD4DgX3FMWfRVVBk0-GysofQQt8KMICIeELCQy03GGRa4IaIDncyVIJd5Ps_a5T2LMxUa-YjLoUFlLzmKERvKRwISsZLGl4mx1Iutilxa3z5XVfs2RuVqDLPZnKVTPIf6QV1rNGarKADpid0wgk",
                    path: "/resume-optimizer"
                  },
                  {
                    title: "Document Summarizer",
                    desc: "Summarize long documents quickly and efficiently, saving you time and effort.",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYqRbE_0t_sp2483OAYEILCfsyXHnTsNRTZtfMBCJisNICMwvnyb9L3Cots0jdqzKGKIgRmngrZi_fsuo8Og1sKu4IlFEJe_xY4Go4a1aIEeZQgGISU7eHg-9VCEnZypyMx8gb4PuD3esYlkZFevMWxt7Yv26GXImBtvnII7kppwFxwoY2KD3H2dWq9lWtQ37EnS2Wp2os6aEx8pEhdvC_utx66wvUcRQIdOGRb9g7Hm0jmQqN_Njrcgvb33rnMG4m42jiMFS1FPY",
                    path: "/summarizer"
                  },
                  {
                    title: "Email Assistant",
                    desc: "Craft professional and effective emails with ease using our AI-powered email writer.",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_CvprzJPNoIcateqEyolR6yrAsfcIgBVrTE9U1wbXrhxhqzxwQ8HfgJQDarV5phUguAPyRi8um0PMJ3xyUfGFIk7lWcb6ZVN_X0a17NffDB8SIIUBD9q8LH2WPSRQFFVx2sR2RxBk18bNmTnIgMyZSw4chu5Hy3xnvKxuwh42eiS2EOKyok8WmACfZTR8ssffrhH6R1_EOeK5Jmy8HO8RYyBAc3RretwSaIDARvvYKDSofZjIsXU6FcL5SVcI9wvV2uFf-d7KJwo",
                    path: "/email-assistant"
                  },
                ].map(({ title, desc, img, path }) => (
                  <div key={title} className="flex-shrink-0 w-80 group">
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${img})` }}
                      ></div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{desc}</p>
                        {isAuthenticated && (
                          <Link
                            to={path}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold group/link"
                          >
                            Try Now
                            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* All Tools */}
            <section className="px-0 sm:px-4 pb-8 pt-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  All{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Tools
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our complete collection of AI-powered solutions
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                  <ToolCard key={index} {...tool} isAuthenticated={isAuthenticated} />
                ))}
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="px-4 py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl my-16">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  What People{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Say
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Hear from our satisfied users about their experience with our AI tools
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {testimonials.map((t, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div
                      className="w-full bg-center bg-no-repeat bg-cover rounded-xl h-48 mb-4 group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url(${t.img})` }}
                    ></div>
                    <div>
                      <p className="text-gray-800 text-base font-medium mb-3 leading-relaxed">{t.text}</p>
                      <p className="text-gray-600 text-sm font-semibold">{t.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export const ToolCard = ({ icon: IconComponent, title, description, path, requiresAuth, isAuthenticated }) => {
  if (requiresAuth && !isAuthenticated) {
    return (
      <div className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="text-3xl mb-4 text-gray-400 group-hover:text-gray-600 transition-colors">
          <IconComponent className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-3 leading-relaxed">{description}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
          <span className="text-xs text-gray-500 font-medium">Sign in required</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={path}
      className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className="text-3xl mb-4 text-blue-600 group-hover:text-purple-600 transition-colors">
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600 mb-3 leading-relaxed">{description}</p>
      <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
        <span>Try Now</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};
