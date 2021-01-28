function PostSkeleton({ type = 'long' }: { type: 'long' | 'short' }) {
  return (
    <div className="p-4 rounded shadow bg-blue-50">
      <div className="flex items-center pb-2 border-b">
        <div className="w-10 h-10 bg-gray-400 rounded-full" />{' '}
        <div className="w-1/4 h-4 ml-4 bg-gray-400 rounded" />
      </div>
      <div className="space-y-2">
        {type === 'long' ? (
          <>
            <div className="w-full h-4 mt-4 bg-gray-400 rounded" />
            <div className="w-2/3 h-4 mt-4 bg-gray-400 rounded" />
          </>
        ) : (
          <div className="w-4/6 h-4 mt-4 bg-gray-400 rounded" />
        )}
      </div>
    </div>
  )
}

function PostListSkeleton() {
  return (
    <div className="max-w-2xl mt-4 space-y-4">
      <div className="animate-pulse">
        <PostSkeleton type="long" />
      </div>
      <div className="animate-pulse" style={{ animationDelay: '200ms' }}>
        <PostSkeleton type="short" />
      </div>
      <div className="animate-pulse" style={{ animationDelay: '400ms' }}>
        <PostSkeleton type="long" />
      </div>
      <div className="animate-pulse" style={{ animationDelay: '600ms' }}>
        <PostSkeleton type="short" />
      </div>
    </div>
  )
}

export { PostSkeleton, PostListSkeleton }
