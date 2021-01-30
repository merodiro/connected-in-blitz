import { resolver } from 'blitz'
import db, { Prisma } from 'db'

type UpdatePostInput = Pick<Prisma.PostUpdateArgs, 'where' | 'data'>

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, data }: UpdatePostInput, ctx) => {
    const post = await db.post.update({ where, data })

    return post
  }
)
