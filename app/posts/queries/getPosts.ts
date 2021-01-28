import { Ctx } from 'blitz'
import db, { Prisma } from 'db'

type GetPostsInput = Pick<Prisma.PostFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default async function getPosts(
  { where, orderBy, skip = 0, take }: GetPostsInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const posts = await db.post.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      user: true,
    },
  })

  const count = await db.post.count()
  const hasMore = typeof take === 'number' ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    posts,
    nextPage,
    hasMore,
    count,
  }
}
