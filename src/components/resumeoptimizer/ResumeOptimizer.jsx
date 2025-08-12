import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/lib/schema/resumeSchema'
import { useOptimizeResume } from '@/hooks/useOptimizeResume'

export default function ResumeOptimizer() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(resumeSchema),
  })

  const fileInputRef = useRef(null)
  const [selectedFileName, setSelectedFileName] = useState('')

  const mutation = useOptimizeResume()

  const onSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        setSelectedFileName('')
        reset()
        if (fileInputRef.current) fileInputRef.current.value = ''
      },
      onError: (error) => {
        // error handled below via mutation.error
      },
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 h-fit lg:sticky lg:top-8 self-start">
          <h2 className="text-2xl font-bold">Optimize Your Resume</h2>
          <p className="text-gray-600">Upload your resume and paste the job description to get started.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.docx"
                {...register('resume')}
                ref={(el) => {
                  const { ref, onChange } = register('resume')
                  if (typeof ref === 'function') ref(el)
                  fileInputRef.current = el
                }}
                className="hidden"
                onChange={(e) => {
                  const { onChange } = register('resume')
                  if (typeof onChange === 'function') onChange(e)
                  const file = e.target.files?.[0]
                  setSelectedFileName(file ? file.name : '')
                }}
              />
              <label htmlFor="resume-upload" className="cursor-pointer text-blue-600 hover:underline">
                Choose a file
              </label>
              <p className="text-xs text-gray-400">PDF, DOCX up to 10MB</p>
              {errors.resume && (
                <p className="mt-2 text-sm text-red-600">{errors.resume.message}</p>
              )}
            </div>

            {selectedFileName && (
              <p className="mt-2 text-sm text-center text-green-600 font-medium">
                Selected: {selectedFileName}
              </p>
            )}

            <div>
              <textarea
                {...register('jobText')}
                rows={6}
                placeholder="Paste the job description here..."
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.jobText ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.jobText && (
                <p className="mt-1 text-sm text-red-600">{errors.jobText.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Optimizing Resume...' : 'Optimize Resume'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col overflow-auto">
          <h2 className="text-2xl font-bold">Optimization Results</h2>
          <p className="text-gray-600 mb-4">Here are the suggestions to improve your resume.</p>

          {mutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
              {mutation.error.message || 'Something went wrong while optimizing resume.'}
            </div>
          )}

          {mutation.data ? (
            <div className="flex-1 overflow-auto bg-gray-50 p-4 rounded-lg border">
              <p className="whitespace-pre-wrap text-gray-800">{mutation.data}</p>
              <div className="mt-4">
                <button
                  onClick={() => navigator.clipboard.writeText(mutation.data)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">✨</div>
                <p>Ready for Optimization</p>
                <p className="text-sm">Your AI-powered feedback will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
