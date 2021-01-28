import * as z from 'zod'

export const CreatePostInput = z.object({
  body: z.string().min(5).max(100),
})

export type CreatePostInputType = z.infer<typeof CreatePostInput>
