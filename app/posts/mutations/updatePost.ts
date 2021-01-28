import { Ctx } from 'blitz'
import db, { Prisma } from 'db'

type UpdatePostInput = Pick<Prisma.PostUpdateArgs, 'where' | 'data'>

export default async function updatePost({ where, data }: UpdatePostInput, ctx: Ctx) {
  ctx.session.$authorize()

  const post = await db.post.update({ where, data })

  return post
}
