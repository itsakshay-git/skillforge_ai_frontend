import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { emailAssistantSchema } from '@/lib/schema/emailAssistantSchema'

export function useEmailAssistant() {
  return useMutation({
    mutationFn: async (values) => {
      emailAssistantSchema.parse(values) // Zod validation

      const res = await axiosInstance.post('/email/email-assist', values)

      if (!res.data.response) {
        throw new Error('No email generated from the service')
      }
      return res.data.response
    }
  })
}
