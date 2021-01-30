import { resolver } from 'blitz'
import db from 'db'
import { CreatePost } from '../validations'

export default resolver.pipe(
  resolver.zod(CreatePost),
  resolver.authorize(),
  async ({ body }, ctx) => {
    const post = await db.post.create({
      data: {
        body,
        userId: ctx.session.userId!,
      },
    })

    return post
  }
)
