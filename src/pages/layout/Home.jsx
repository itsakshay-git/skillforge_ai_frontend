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
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Hero Section */}
        <div className="px-8 sm:px-20 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full">
            <div className="md:@container">
              <div className="sm:w-full">
                <div
                  className="flex sm:w-full md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat justify-center p-5 sm:p-[80px] rounded-xl"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="flex flex-col gap-2 p-2 sm:p-0">
                    <h1 className="text-white text-2xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                      Explore Our AI Tools
                    </h1>
                    <h2 className="text-white text-[10px] sm:text-sm font-normal @[480px]:text-base w-[250px] sm:w-[400px]">
                      Unlock the power of artificial intelligence with our suite of tools designed to enhance your productivity and creativity.
                    </h2>
                  </div>
                  {isAuthenticated ? (
                    <Link
                      to="/resume-optimizer"
                      className="flex w-[200px] sm:min-w-[84px] sm:max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3490f3] text-white text-sm font-bold tracking-[0.015em] @[480px]:text-base hover:bg-blue-700 transition-colors"
                    >
                      <span className="truncate">Get Started</span>
                    </Link>
                  ) : (
                    <div onClick={() => setShowAuthModal(true)} className="text-white text-sm hover:bg-[#3490f3] bg-blue-700 cursor-pointer p-2 rounded-full w-[250px]">
                      Please sign in to access our AI tools
                    </div>
                  )}
                </div>
              </div>
            </div>

            <section className="px-0 sm:px-4 pb-3 pt-5 rounded-2xl">
              <h2 className="text-[20px] font-bold text-[#111418] tracking-tight">Why Choose Our AI Tools?</h2>
              <div className="flex flex-col gap-10 py-10">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl sm:text-8xl font-bold max-w-[720px] text-[#111418]">
                    Experience the Benefits
                  </h1>
                  <p className="text-base max-w-[720px] text-[#111418]">
                    Discover how our AI tools can transform your work and personal life.
                  </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                  {[
                    {
                      title: 'Save Time',
                      desc: 'Our AI tools help you accomplish tasks faster, freeing up your time for other important activities.',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M128,24A104,104,0,1,0,232,128A104.11,104.11,0,0,0,128,24Zm0,192A88,88,0,1,1,216,128,88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                        </svg>
                      )
                    },
                    {
                      title: 'Improve Efficiency',
                      desc: 'Streamline your workflow and achieve more with less effort using our intelligent tools.',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                        </svg>
                      )
                    },
                    {
                      title: 'Boost Creativity',
                      desc: 'Unlock new possibilities and enhance your creative output with the power of AI.',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z" />
                        </svg>
                      )
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex flex-col gap-3 p-4 rounded-lg bg-green-200">
                      <div className="text-[#111418]">{feature.icon}</div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-base font-bold text-[#111418]">{feature.title}</h2>
                        <p className="text-sm text-[#60758a]">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Tools */}
            <h2 className="text-[#111418] text-4xl sm:text-6xl font-bold px-0 sm:px-4 pb-3 pt-5">Featured Tools</h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch px-0 py-4 sm:p-4 gap-3">
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
                  <div key={title} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                    <div>
                      <p className="text-[#111418] text-base font-medium">{title}</p>
                      <p className="text-[#60758a] text-sm font-normal">{desc}</p>
                      {isAuthenticated && (
                        <Link
                          to={path}
                          className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Try Now →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Tools */}
            <h2 className="text-[#111418] text-4xl sm:text-6xl font-bold px-0 sm:px-4 pb-3 pt-5">All Tools</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 px-0 py-4 sm:p-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} isAuthenticated={isAuthenticated} />
              ))}
            </div>

            <section className="px-4 py-8 bg-gray-50 rounded-2xl my-10">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl sm:text-6xl font-bold text-center mb-8">What People Say</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {testimonials.map((t, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 rounded-lg bg-white shadow p-4"
                    >
                      <div
                        className="w-full bg-center bg-no-repeat bg-cover rounded-xl h-[200px]"
                        style={{ backgroundImage: `url(${t.img})` }}
                      ></div>
                      <div>
                        <p className="text-[#121417] text-base font-medium">{t.text}</p>
                        <p className="text-[#677583] text-sm">{t.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

export const ToolCard = ({ icon, title, description, path, requiresAuth, isAuthenticated }) => {
  if (requiresAuth && !isAuthenticated) {
    return (
      <div className="border border-gray-200 rounded-xl p-4 shadow text-left hover:shadow-md transition-all cursor-pointer hover:scale-105">
        <div className="text-2xl mb-2">{icon}</div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-xs text-gray-500 mt-2">Sign in required</p>
      </div>
    );
  }

  return (
    <Link
      to={path}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-all cursor-pointer text-left block hover:scale-105"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <p className="text-xs text-blue-600 mt-2">Try Now →</p>
    </Link>
  );
};
