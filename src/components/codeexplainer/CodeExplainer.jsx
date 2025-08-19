import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Editor from '@monaco-editor/react'
import { codeExplainerSchema } from '@/lib/schema/codeExplainerSchema'
import { useCodeExplainer } from '@/hooks/useCodeExplainer'
import { Code, Sparkles, Copy, CheckCircle, AlertCircle, ArrowRight, Zap, BookOpen, Brain } from 'lucide-react'
import { useState } from 'react'

export default function CodeExplainer() {
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm({
    resolver: zodResolver(codeExplainerSchema),
    defaultValues: {
      code: '',
      language: '',
      tone: 'technical'
    }
  })

  const selectedLanguage = useWatch({ control, name: 'language' })
  const [copied, setCopied] = useState(false)

  const mutation = useCodeExplainer()

  const monacoLanguageMap = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    typescript: 'typescript',
    html: 'html',
    css: 'css',
    sql: 'sql',
    bash: 'shell',
    other: 'plaintext'
  }

  const onSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        reset({ ...values, code: '' })
      }
    })
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mutation.data)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
          <span className="text-indigo-600 font-semibold text-sm">AI-Powered Code Explanation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Understand Code with{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Intelligence
          </span>
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Paste your code and get instant, intelligent explanations in your preferred language and tone
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 space-y-6 h-fit lg:sticky lg:top-8 self-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Code & Preferences</h2>
              <p className="text-sm text-gray-600">Write your code and choose explanation style</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Code Editor */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Your Code
              </label>
              <div className="border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all duration-300">
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      height="40vh"
                      theme="vs-dark"
                      language={monacoLanguageMap[selectedLanguage] || 'plaintext'}
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        roundedSelection: false,
                        padding: { top: 16, bottom: 16 }
                      }}
                    />
                  )}
                />
              </div>
              {errors.code && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.code.message}
                </div>
              )}
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Programming Language */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Programming Language
                </label>
                <div className="relative">
                  <select
                    {...register('language')}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 appearance-none bg-white"
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
                    <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
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

              {/* Explanation Tone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Explanation Tone
                </label>
                <div className="relative">
                  <select
                    {...register('tone')}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="technical">🔬 Technical - Expert-level detail</option>
                    <option value="simple">💡 Simple - Easy to understand</option>
                    <option value="beginner">🎓 Beginner-Friendly - Step-by-step</option>
                    <option value="detailed">📚 Detailed - Comprehensive analysis</option>
                    <option value="concise">⚡ Concise - Quick overview</option>
                    <option value="academic">🎓 Academic - Scholarly approach</option>
                    <option value="casual">😎 Casual - Relaxed explanation</option>
                  </select>
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 transform hover:-translate-y-1"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Explanation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Explain Code</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Code Explanation</h2>
              <p className="text-sm text-gray-600">Intelligent analysis tailored to your preferences</p>
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
                  <p className="text-sm font-medium text-red-800">Explanation Failed</p>
                  <p className="text-xs text-red-600">{mutation.error.message || 'Something went wrong while generating explanation.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Content */}
          {mutation.data ? (
            <div className="flex-1 space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-2xl border border-gray-200/50 p-6 overflow-auto">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{mutation.data}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1"
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
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Code Explanation</h3>
                <p className="text-gray-600 text-sm max-w-xs">
                  Paste your code, select language and tone to get an AI-powered explanation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
