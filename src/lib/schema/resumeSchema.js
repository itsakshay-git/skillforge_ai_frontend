import * as z from 'zod'

export const resumeSchema = z.object({
  resume: z
    .any()
    .refine(files => files?.length === 1, 'Resume file is required')
    .refine(
      files => files && files[0]?.size <= 10 * 1024 * 1024,
      'File size must be less than 10MB'
    )
    .refine(
      files =>
        files && [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(files[0]?.type),
      'File must be PDF or DOCX'
    ),
  jobText: z.string().min(1, 'Job description is required'),
})
