import { z } from 'zod'

export const emailAssistantSchema = z.object({
  mode: z.string().min(1, 'Email mode is required'),
  input: z.string().min(1, 'Input is required'),
  tone: z.string().optional(),
  recipient: z.string().optional(),
  context: z.string().optional(),
})
