import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloud, FileText, Sparkles, Copy, CheckCircle, AlertCircle, ArrowRight, BookOpen, Zap } from 'lucide-react'
import { fileUploadSchema } from '@/lib/schema/fileUploadSchema'
import { useFileUpload } from '@/hooks/useFileUpload'

export default function FileUpload() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(fileUploadSchema),
  })

  const [selectedFileName, setSelectedFileName] = useState('')
  const [copied, setCopied] = useState(false)
  const mutation = useFileUpload();

  const onSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        setSelectedFileName('')
        reset()
      },
      onError: (error) => {
        console.error('Mutation error:', error)
      },
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
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full animate-pulse"></div>
          <span className="text-purple-600 font-semibold text-sm">AI-Powered Document Summarization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Summarize Documents with{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Intelligence
          </span>
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Upload any document and get instant, intelligent summaries tailored to your preferred tone and style
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 space-y-6 h-fit lg:sticky lg:top-8 self-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Document & Preferences</h2>
              <p className="text-sm text-gray-600">Upload your document and choose your preferred tone</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* File Upload */}
            <div className="group">
              <label htmlFor="file-upload" className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-purple-600 font-semibold text-sm mb-1">Upload a file</p>
                  <p className="text-xs text-gray-500">PDF, DOCX, TXT up to 10MB</p>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx,.txt"
                {...register('file')}
                onChange={(e) => {
                  register('file').onChange(e)
                  if (e.target.files.length > 0) {
                    setSelectedFileName(e.target.files[0].name)
                  } else {
                    setSelectedFileName('')
                  }
                }}
                className="hidden"
              />
              {errors.file && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.file.message}
                </div>
              )}
            </div>

            {/* Selected File Display */}
            {selectedFileName && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-800">File Selected</p>
                    <p className="text-xs text-purple-600 truncate">{selectedFileName}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            )}

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Choose Your Tone
              </label>
              <div className="relative">
                <select
                  {...register('tone')}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 appearance-none bg-white"
                  defaultValue="neutral"
                >
                  <option value="neutral">🎯 Neutral - Balanced and objective</option>
                  <option value="formal">👔 Formal - Professional and business-like</option>
                  <option value="friendly">😊 Friendly - Warm and approachable</option>
                  <option value="simplified">📝 Simplified - Easy to understand</option>
                  <option value="professional">💼 Professional - Expert and authoritative</option>
                  <option value="casual">😎 Casual - Relaxed and conversational</option>
                </select>
                <div className="absolute top-4 right-4 pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              {errors.tone && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.tone.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 transform hover:-translate-y-1"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Summary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Summary</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI-Generated Summary</h2>
              <p className="text-sm text-gray-600">Intelligent summary tailored to your preferences</p>
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
                  <p className="text-sm font-medium text-red-800">Summarization Failed</p>
                  <p className="text-xs text-red-600">{mutation.error.message || 'Something went wrong while generating summary.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Content */}
          {mutation.data ? (
            <div className="flex-1 space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl border border-gray-200/50 p-6 overflow-auto">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{mutation.data}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-3 px-6 rounded-2xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1"
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
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Summarization</h3>
                <p className="text-gray-600 text-sm max-w-xs">
                  Upload your document and choose your preferred tone to get an AI-powered summary
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
