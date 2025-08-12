import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { codeExplainerSchema } from '@/lib/schema/codeExplainerSchema'
import { useCodeExplainer } from '@/hooks/useCodeExplainer'

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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold">Code Explainer</h2>

        {/* Monaco Editor */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Editor
                height="50vh"
                theme="vs-dark"
                language={monacoLanguageMap[selectedLanguage] || 'plaintext'}
                value={field.value}
                onChange={(value) => field.onChange(value || '')}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false
                }}
              />
            )}
          />
          {errors.code && <p className="text-red-600 text-sm mt-1">{errors.code.message}</p>}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold block mb-2">Programming Language</label>
            <select
              {...register('language')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
            <label className="font-semibold block mb-2">Explanation Tone</label>
            <select
              {...register('tone')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="technical">Technical</option>
              <option value="simple">Simple</option>
              <option value="beginner">Beginner-Friendly</option>
              <option value="detailed">Detailed</option>
              <option value="concise">Concise</option>
              <option value="academic">Academic</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Generating...' : 'Explain Code'}
            </button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {mutation.isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          {mutation.error.message || 'Something went wrong while generating explanation.'}
        </div>
      )}

      {/* Explanation Output */}
      {mutation.data && (
        <div className="bg-gray-100 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Code Explanation</h2>
          <p className="whitespace-pre-wrap text-gray-800">{mutation.data}</p>
        </div>
      )}
    </div>
  )
}
