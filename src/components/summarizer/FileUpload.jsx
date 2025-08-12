import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloud } from 'lucide-react'
import { fileUploadSchema } from '@/lib/schema/fileUploadSchema'
import { useFileUpload } from '@/hooks/useFileUpload'

export default function FileUpload() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(fileUploadSchema),
  })

  const [selectedFileName, setSelectedFileName] = useState('')
  const mutation = useFileUpload()

  console.log('Loading state:', mutation)

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

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold">Summarize Your Document</h2>

          {/* Drag and Drop Zone */}
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition flex flex-col items-center"
          >
            <UploadCloud className="w-12 h-12 text-gray-400" />
            <p className="mt-2 text-blue-600 font-medium">Upload a file</p>
            <p className="text-sm text-gray-500">PDF, DOCX, TXT up to 10MB</p>
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
          </label>

          {/* File validation error */}
          {errors.file && (
            <p className="text-red-600 text-sm mt-1">{errors.file.message}</p>
          )}

          {/* Show Selected File Name */}
          {selectedFileName && (
            <p className="text-sm text-green-600 text-center">
              Selected: <span className="font-medium">{selectedFileName}</span>
            </p>
          )}

          {/* Tone Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">Choose a Tone</label>
            <select
              {...register('tone')}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              defaultValue="neutral"
            >
              <option value="neutral">Neutral</option>
              <option value="formal">Formal</option>
              <option value="friendly">Friendly</option>
              <option value="simplified">Simplified</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
            </select>
            {errors.tone && (
              <p className="text-red-600 text-sm mt-1">{errors.tone.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Summarizing...' : 'Generate Summary'}
          </button>

          {/* Error message */}
          {mutation.isError && (
            <p className="text-red-600 text-sm mt-2">{mutation.error.message}</p>
          )}
        </form>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Generated Summary</h2>
          {mutation.data ? (
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {mutation.data}
            </p>
          ) : (
            <p className="text-gray-400 italic">
              Your summary will appear here after uploading a document.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
