import { useMutation } from '@tanstack/react-query' 
import { axiosInstance } from '@/lib/axios'

export function useCodeExplainer() {
  return useMutation({
    mutationFn: async (values) => {
      const res = await axiosInstance.post('/explain/explain', values)
      if (!res.data.explanation) {
        throw new Error('No explanation returned from the service')
      }
      return res.data.explanation
    }
  })
}
