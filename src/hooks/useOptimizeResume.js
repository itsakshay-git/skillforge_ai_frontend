import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'

export function useOptimizeResume() {
  return useMutation({
    mutationFn: async (values) => {
      const formData = new FormData()
      formData.append('resume', values.resume[0])
      formData.append('jobText', values.jobText)

      const res = await axiosInstance.post('/resume/optimize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (!res.data.data) {
        throw new Error('No optimization returned from the service')
      }

      return res.data.data
    },
  })
}
