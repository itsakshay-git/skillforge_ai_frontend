import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { codeQuizSchema } from '@/lib/schema/codeQuizSchema'

export function useCodeQuiz() {
  return useMutation({
    mutationFn: async (values) => {
      // Validate inputs
      codeQuizSchema.parse(values)

      const res = await axiosInstance.post('/codequiz/generate', values)

      if (!res.data.quiz) {
        throw new Error('No quiz generated from the service')
      }
      return res.data.quiz
    },
  })
}
