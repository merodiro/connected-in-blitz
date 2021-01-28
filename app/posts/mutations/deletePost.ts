import { Ctx } from 'blitz'
import db, { Prisma } from 'db'

type DeletePostInput = Pick<Prisma.PostDeleteArgs, 'where'>

export default async function deletePost({ where }: DeletePostInput, ctx: Ctx) {
  ctx.session.$authorize()

  const post = await db.post.delete({ where })

  return post
}
