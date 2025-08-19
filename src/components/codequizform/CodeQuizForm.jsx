import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Clipboard, Loader2, Lightbulb, Sparkles, Copy, CheckCircle, AlertCircle, ArrowRight, Zap, Code, Target, Brain } from 'lucide-react'
import { codeQuizSchema } from '@/lib/schema/codeQuizSchema'
import { useCodeQuiz } from '@/hooks/useCodeQuiz'

export default function CodeQuizForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(codeQuizSchema),
  })

  const mutation = useCodeQuiz()
  const [copied, setCopied] = useState(false)

  const onSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: () => reset(),
    })
  }

  const handleCopy = () => {
    if (!mutation.data) return
    navigator.clipboard.writeText(mutation.data)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
          <span className="text-amber-700 font-semibold text-sm">AI-Powered Code Quiz Generation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Generate Code Quizzes with{" "}
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            AI Intelligence
          </span>
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Create personalized coding quizzes and interview questions tailored to your skill level and programming language
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 space-y-6 h-fit lg:sticky lg:top-8 self-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Quiz Configuration</h2>
              <p className="text-sm text-gray-600">Set your quiz parameters and preferences</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Programming Language */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Programming Language
              </label>
              <div className="relative">
                <select
                  {...register('language')}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 appearance-none bg-white ${errors.language
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-amber-400 focus:ring-amber-400/20'
                    }`}
                >
                  <option value="">Select Language</option>
                  <option value="javascript">🚀 JavaScript</option>
                  <option value="python">🐍 Python</option>
                  <option value="java">☕ Java</option>
                  <option value="cpp">⚡ C++</option>
                  <option value="typescript">🔷 TypeScript</option>
                  <option value="html">🌐 HTML</option>
                  <option value="css">🎨 CSS</option>
                  <option value="sql">🗄️ SQL</option>
                  <option value="bash">💻 Bash</option>
                  <option value="other">📄 Other</option>
                </select>
                <div className="absolute top-3 right-3 pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Code className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              {errors.language && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.language.message}
                </div>
              )}
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <div className="relative">
                <select
                  {...register('difficulty')}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 appearance-none bg-white ${errors.difficulty
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-amber-400 focus:ring-amber-400/20'
                    }`}
                >
                  <option value="">Select Difficulty</option>
                  <option value="beginner">🌱 Beginner - Basic concepts</option>
                  <option value="intermediate">🌿 Intermediate - Moderate complexity</option>
                  <option value="advanced">🌳 Advanced - Complex scenarios</option>
                  <option value="expert">🏆 Expert - Master-level challenges</option>
                </select>
                <div className="absolute top-3 right-3 pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              {errors.difficulty && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.difficulty.message}
                </div>
              )}
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Topic (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('topic')}
                  placeholder="e.g., arrays, functions, OOP, algorithms"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all duration-300"
                />
                <div className="absolute top-3 right-3 pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Number of Questions */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Number of Questions
              </label>
              <div className="relative">
                <select
                  {...register('questionCount')}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 appearance-none bg-white ${errors.questionCount
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-amber-400 focus:ring-amber-400/20'
                    }`}
                >
                  <option value="">Select Count</option>
                  <option value="5">📝 5 Questions - Quick practice</option>
                  <option value="10">📚 10 Questions - Standard quiz</option>
                  <option value="15">📖 15 Questions - Comprehensive test</option>
                  <option value="20">📚 20 Questions - Full assessment</option>
                </select>
                <div className="absolute top-3 right-3 pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              {errors.questionCount && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.questionCount.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/25 transform hover:-translate-y-1"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Quiz...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Quiz</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Generated Quiz</h2>
              <p className="text-sm text-gray-600">AI-powered questions tailored to your preferences</p>
            </div>
          </div>

          {/* Error State */}
          {mutation.isError && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Quiz Generation Failed</p>
                  <p className="text-xs text-red-600">{mutation.error.message || 'Something went wrong while generating quiz.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Content */}
          {mutation.data ? (
            <div className="flex-1 space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-amber-50/20 rounded-xl border border-gray-200/50 p-6 overflow-auto">
                <div className="prose prose-sm max-w-none">
                  <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800 leading-relaxed bg-transparent border-0 p-0 m-0">
                    {mutation.data}
                  </pre>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/25 transform hover:-translate-y-1"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Quiz Generation</h3>
                <p className="text-gray-600 text-sm max-w-xs">
                  Configure your quiz settings to get AI-powered coding questions and interview challenges
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
