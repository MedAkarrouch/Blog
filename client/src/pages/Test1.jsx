import { useInfiniteQuery } from '@tanstack/react-query'
import { getPostComments } from '../services/apiComments'
import { getPost } from '../services/apiPosts'

function Test1() {
  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['p-c'],
      queryFn: ({ pageParam = 1 }) =>
        getPost({
          postId: '651571f324aa6c0e887b6384',
          commentsPage: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        // console.log({ lastPage, allPages })
        const totalPages = Math.ceil(lastPage.commentsCount / 10)
        if (allPages.length < totalPages) return allPages.length + 1
        else return undefined
      },
    })
  console.log('Post = ', data?.pages?.at(0))
  // console.log(data, hasNextPage)
  const comments = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.comments]
  }, [])
  console.log(comments?.length, comments)
  return (
    <div>
      <button
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={() => fetchNextPage()}
      >
        Fetch
      </button>
    </div>
  )
}

export default Test1
