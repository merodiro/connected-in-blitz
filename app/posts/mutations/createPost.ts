import { Ctx } from 'blitz'
import db from 'db'
import { CreatePostInput, CreatePostInputType } from '../validations'

export default async function createPost(input: CreatePostInputType, ctx: Ctx) {
  ctx.session.$authorize()

  const { body } = CreatePostInput.parse(input)

  const post = await db.post.create({
    data: {
      body,
      userId: ctx.session.userId,
    },
  })

  return post
}
