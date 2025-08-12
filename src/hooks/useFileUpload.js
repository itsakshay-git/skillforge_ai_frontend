import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'

export function useFileUpload() {
  return useMutation({
    mutationFn: async (values) => {
      console.log('mutation function running with:', values)
      const formData = new FormData()
      formData.append('file', values.file[0])
      formData.append('tone', values.tone || 'neutral')

      const res = await axiosInstance.post('/summarizer/upload/authenticated', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (!res.data.summary) {
        throw new Error('No summary returned from the service')
      }

      return res.data.summary
    },
  })
}


