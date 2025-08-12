import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEmailAssistant } from '@/hooks/useEmailAssistant'
import { emailAssistantSchema } from '@/lib/schema/emailAssistantSchema'
import { useState } from 'react'

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
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Side - Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-5 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800">AI Email Assistant</h2>

          <div>
            <label className="font-semibold block mb-2">Email Mode</label>
            <select
              {...register('mode')}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.mode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Select Mode</option>
              <option value="write">Write New Email</option>
              <option value="improve">Improve Existing Email</option>
              <option value="translate">Translate Email</option>
              <option value="reply">Generate Reply</option>
              <option value="follow-up">Follow-up Email</option>
            </select>
            {errors.mode && (
              <p className="text-red-600 text-sm mt-1">{errors.mode.message}</p>
            )}
          </div>

          <div>
            <label className="font-semibold block mb-2">Input</label>
            <textarea
              {...register('input')}
              rows={4}
              placeholder="Enter your email content, topic, or what you want to write about..."
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.input ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.input && (
              <p className="text-red-600 text-sm mt-1">{errors.input.message}</p>
            )}
          </div>

          {/* ...rest of form fields (tone, recipient, context) - optional to show errors for them if you want */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-2">Tone</label>
              <select
                {...register('tone')}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="empathetic">Empathetic</option>
                <option value="assertive">Assertive</option>
                <option value="diplomatic">Diplomatic</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-2">Recipient</label>
              <input
                type="text"
                {...register('recipient')}
                placeholder="e.g., client, colleague, manager"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">Context (Optional)</label>
            <textarea
              {...register('context')}
              rows={3}
              placeholder="Additional context, background, or specific requirements..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Generating Email...' : '✨ Generate Email'}
          </button>
        </form>

        {/* Right Side - Generated Email */}
        <div className="flex flex-col gap-4">
          {mutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {mutation.error.message || 'Something went wrong.'}
            </div>
          )}

          {mutation.data ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200 flex-1 overflow-auto scrollbar-hide">
              <h2 className="text-xl font-bold text-blue-700 mb-4">Generated Email</h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <p className="whitespace-pre-wrap text-gray-800">{mutation.data}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleCopy}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 shadow-sm"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center text-gray-500 border border-dashed rounded-xl p-6 h-full">
              AI-generated email will appear here...
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
