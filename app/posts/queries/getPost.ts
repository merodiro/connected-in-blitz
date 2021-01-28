import { Ctx, NotFoundError } from 'blitz'
import db, { Prisma } from 'db'

type GetPostInput = Pick<Prisma.PostFindFirstArgs, 'where'>

export default async function getPost({ where }: GetPostInput, ctx: Ctx) {
  ctx.session.$authorize()

  const post = await db.post.findFirst({ where })

  if (!post) throw new NotFoundError()

  return post
}
