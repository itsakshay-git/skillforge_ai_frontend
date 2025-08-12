import { z } from 'zod'

export const codeQuizSchema = z.object({
  language: z.string().min(1, 'Language is required'),
  difficulty: z.string().min(1, 'Difficulty is required'),
  topic: z.string().optional(),
  questionCount: z.enum(['5', '10', '15', '20'], 'Select valid question count'),
})
