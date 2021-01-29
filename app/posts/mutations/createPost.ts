import { pipe } from 'blitz'
import db from 'db'
import { CreatePost } from '../validations'

export default pipe.resolver(pipe.zod(CreatePost), pipe.authorize(), async ({ body }, ctx) => {
  const post = await db.post.create({
    data: {
      body,
      userId: ctx.session.userId!,
    },
  })

  return post
})
