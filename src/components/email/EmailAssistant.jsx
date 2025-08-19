import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEmailAssistant } from '@/hooks/useEmailAssistant'
import { emailAssistantSchema } from '@/lib/schema/emailAssistantSchema'
import { useState } from 'react'
import { Mail, Sparkles, Copy, CheckCircle, AlertCircle, ArrowRight, Zap, MessageSquare, Users, Brain } from 'lucide-react'

export default function EmailAssistant() {
  const [copied, setCopied] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailAssistantSchema),
  })

  const mutation = useEmailAssistant()

  const onSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        reset()
      },
    })
  }

  const handleCopy = () => {
    if (!mutation.data) return
    navigator.clipboard.writeText(mutation.data)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse"></div>
          <span className="text-emerald-600 font-semibold text-sm">AI-Powered Email Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Craft Perfect Emails with{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            AI Intelligence
          </span>
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Generate professional emails, improve existing ones, or get intelligent replies tailored to your style and context
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 space-y-6 h-fit lg:sticky lg:top-8 self-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Email & Preferences</h2>
              <p className="text-sm text-gray-600">Configure your email settings and content</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Mode */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Mode
              </label>
              <div className="relative">
                <select
                  {...register('mode')}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 appearance-none bg-white ${errors.mode
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                >
                  <option value="">Select Mode</option>
                  <option value="write">✍️ Write New Email</option>
                  <option value="improve">🔧 Improve Existing Email</option>
                  <option value="translate">🌐 Translate Email</option>
                  <option value="reply">↩️ Generate Reply</option>
                  <option value="follow-up">📧 Follow-up Email</option>
                </select>
                <div className="absolute top-3 right-3 pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              {errors.mode && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.mode.message}
                </div>
              )}
            </div>

            {/* Input Content */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Input Content
              </label>
              <div className="relative">
                <textarea
                  {...register('input')}
                  rows={4}
                  placeholder="Enter your email content, topic, or what you want to write about..."
                  className={`w-full p-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 resize-none ${errors.input
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                />
                <div className="absolute top-4 right-4">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.input && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.input.message}
                </div>
              )}
            </div>

            {/* Tone and Recipient */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tone
                </label>
                <div className="relative">
                  <select
                    {...register('tone')}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="professional">👔 Professional - Business-like</option>
                    <option value="friendly">😊 Friendly - Warm and approachable</option>
                    <option value="formal">🎩 Formal - Traditional and proper</option>
                    <option value="casual">😎 Casual - Relaxed and conversational</option>
                    <option value="enthusiastic">🚀 Enthusiastic - Energetic and positive</option>
                    <option value="empathetic">🤝 Empathetic - Understanding and caring</option>
                    <option value="assertive">💪 Assertive - Confident and direct</option>
                    <option value="diplomatic">🕊️ Diplomatic - Tactful and balanced</option>
                  </select>
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <div className="w-5 h-5 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Recipient
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('recipient')}
                    placeholder="e.g., client, colleague, manager"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                  />
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Context */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Context (Optional)
              </label>
              <div className="relative">
                <textarea
                  {...register('context')}
                  rows={3}
                  placeholder="Additional context, background, or specific requirements..."
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 resize-none"
                />
                <div className="absolute top-4 right-4">
                  <Brain className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 transform hover:-translate-y-1"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Email...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Email</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI-Generated Email</h2>
              <p className="text-sm text-gray-600">Professional email tailored to your preferences</p>
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
                  <p className="text-sm font-medium text-red-800">Email Generation Failed</p>
                  <p className="text-xs text-red-600">{mutation.error.message || 'Something went wrong while generating email.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Content */}
          {mutation.data ? (
            <div className="flex-1 space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl border border-gray-200/50 p-6 overflow-auto">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{mutation.data}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 px-6 rounded-2xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1"
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
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Email Generation</h3>
                <p className="text-gray-600 text-sm max-w-xs">
                  Configure your email settings and content to get an AI-powered professional email
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
