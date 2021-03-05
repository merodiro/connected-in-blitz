import { resolver } from 'blitz'
import db from 'db'
import { DeletePost } from '../validations'

export default resolver.pipe(resolver.zod(DeletePost), resolver.authorize(), async ({ id }) => {
  const post = await db.post.delete({
    where: {
      id,
    },
  })

  return post
})
