import { resolver } from 'blitz'
import db, { Prisma } from 'db'

type DeletePostInput = Pick<Prisma.PostDeleteArgs, 'where'>

export default resolver.pipe(resolver.authorize(), async ({ where }: DeletePostInput, ctx) => {
  const post = await db.post.delete({ where })

  return post
})
