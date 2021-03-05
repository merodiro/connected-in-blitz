import * as z from 'zod'

export const CreatePost = z.object({
  body: z.string().min(5).max(100),
})

export const UpdatePost = z.object({
  id: z.string(),
  body: z.string().min(5).max(100),
})

export const DeletePost = z.object({
  id: z.string(),
})
