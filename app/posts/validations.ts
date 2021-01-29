import * as z from 'zod'

export const CreatePost = z.object({
  body: z.string().min(5).max(100),
})
