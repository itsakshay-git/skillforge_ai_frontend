import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Clipboard, Loader2 } from 'lucide-react'
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:items-start">
        {/* Left column: Fixed form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow p-8 space-y-6 border border-gray-200
            md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:flex-shrink-0 md:w-96 md:overflow-y-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-8">AI Code Quiz Generator</h1>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Programming Language</label>
              <select
                {...register('language')}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.language ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Language</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
                <option value="bash">Bash</option>
                <option value="other">Other</option>
              </select>
              {errors.language && <p className="text-red-600 text-sm mt-1">{errors.language.message}</p>}
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-2">Difficulty Level</label>
              <select
                {...register('difficulty')}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.difficulty ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              {errors.difficulty && <p className="text-red-600 text-sm mt-1">{errors.difficulty.message}</p>}
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-2">Topic (Optional)</label>
              <input
                type="text"
                {...register('topic')}
                placeholder="e.g., arrays, functions, OOP"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-2">Number of Questions</label>
              <select
                {...register('questionCount')}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.questionCount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Count</option>
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
                <option value="20">20 Questions</option>
              </select>
              {errors.questionCount && <p className="text-red-600 text-sm mt-1">{errors.questionCount.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending && <Loader2 className="animate-spin w-5 h-5" />}
            {mutation.isPending ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>

          {mutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm mt-4">
              {mutation.error.message || 'Something went wrong.'}
            </div>
          )}
        </form>

        {/* Right column: Quiz output */}
        <div
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow p-8 border border-gray-200 mt-10 md:mt-0 flex flex-col overflow-auto"
        >
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Generated Quiz</h2>
          {mutation.data ? (
            <>
              <pre className="bg-gray-50 rounded-lg p-6 border border-gray-300 font-mono text-sm whitespace-pre-wrap text-gray-800">
                {mutation.data}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-6 self-center flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors"
              >
                <Clipboard className="w-5 h-5" />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </>
          ) : (
            <p className="text-gray-400 italic text-center">
              Your generated quiz will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
