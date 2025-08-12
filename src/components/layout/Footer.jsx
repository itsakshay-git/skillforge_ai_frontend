import React from 'react'

export default function Footer() {
  return (
        <footer className="flex justify-center bg-green-200">
          <div className="flex max-w-[1050px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-5 @container">
              <div className="flex items-center justify-center gap-4 text-[#111418]">
                <div className="size-4">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="text-[#111418] text-2xl font-bold leading-tight tracking-[-0.015em]">
                  SkillForge AI
                </h2>
              </div>
              <div className="flex items-center justify-center gap-4 text-[#111418] my-[50px]">
                <span className="p-2 px-4 border rounded-full">Code Explainer</span><span className="p-2 px-4 border rounded-full">Code to Quiz</span><span className="p-2 px-4 border rounded-full">Resume Analyzer</span><span className="p-2 px-4 border rounded-full">Email Assistant</span><span className="p-2 px-4 border rounded-full">Job Matcher</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-between">
                <a className="text-[#60758a] text-base font-normal min-w-40" href="#">
                  Terms of Service
                </a>
                <a className="text-[#60758a] text-base font-normal min-w-40" href="#">
                  Privacy Policy
                </a>
                <p className="text-[#60758a] text-base font-normal">
                  © 2024 AI Tools Hub. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </footer>
  )
}