import * as z from 'zod'

export const codeExplainerSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  language: z.string().min(1, 'Language is required'),
  tone: z.enum(['technical', 'simple', 'beginner', 'detailed', 'concise', 'academic', 'casual']).default('technical'),
})
