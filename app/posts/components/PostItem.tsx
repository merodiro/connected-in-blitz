import { Post, User } from '@prisma/client'

type PostItemProps = {
  post: Post & { user: User }
}

function PostItem({ post }: PostItemProps) {
  return (
    <div className="p-4 rounded shadow bg-blue-50">
      <div className="flex items-center pb-2 border-b">
        <img
          src={`https://avatar.oxro.io/avatar.svg?name=${post.user.name}`}
          className="w-10 h-10 rounded-full"
          alt=""
        />{' '}
        <h2 className="ml-2 text-blue-700">{post.user.name}</h2>
      </div>
      <p className="mt-4 text-gray-700 ">{post.body}</p>
    </div>
  )
}

export default PostItem
