import { Suspense } from 'react'
import { BlitzPage, useQuery, dynamic, invalidateQuery } from 'blitz'
import getPosts from 'app/posts/queries/getPosts'
import { PostListSkeleton } from 'app/posts/components/PostSkeleton'
import Layout from 'app/core/layouts/Layout'
import PostForm from 'app/posts/components/PostForm'

const PostItem = dynamic(() => import('app/posts/components/PostItem'))

export const PostsList = () => {
  const [{ posts }] = useQuery(getPosts, {
    orderBy: { id: 'desc' },
    where: {},
  })

  return (
    <div className="max-w-2xl mt-4 space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

const FeedPage: BlitzPage = () => {
  return (
    <main className="container mx-auto">
      <PostForm
        onSuccess={() => {
          invalidateQuery(getPosts)
        }}
      />

      <Suspense fallback={<PostListSkeleton />}>
        <PostsList />
      </Suspense>
    </main>
  )
}

FeedPage.getLayout = (page) => <Layout title={'News feed'}>{page}</Layout>

export default FeedPage
