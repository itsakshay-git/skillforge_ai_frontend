import * as z from 'zod'

export const fileUploadSchema = z.object({
  file: z
    .any()
    .refine(files => files?.length === 1, 'File is required')
    .refine(
      files => files && files[0]?.size <= 10 * 1024 * 1024,
      'File size must be less than 10MB'
    )
    .refine(
      files =>
        files &&
        ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(
          files[0]?.type
        ),
      'File must be PDF, DOCX, or TXT'
    ),
  tone: z
    .string()
    .optional()
    .default('neutral')
    .refine(val =>
      ['neutral', 'formal', 'friendly', 'simplified', 'professional', 'casual'].includes(val),
      'Invalid tone selected'
    ),
})
