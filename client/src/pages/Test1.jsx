import { useInfiniteQuery } from '@tanstack/react-query'
import { getPostComments } from '../services/apiComments'

function Test1() {
  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['p-c'],
      queryFn: ({ pageParam = 1 }) =>
        getPostComments({
          post: '651571f324aa6c0e887b6384',
          page: pageParam,
          pageSize: 10,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = Math.ceil(lastPage.count / 10)
        if (allPages.length < totalPages) return allPages.length + 1
        else return undefined
        // console.log({ lastPage, allPages })
      },
    })
  console.log(data, hasNextPage)
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
