import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPostComments } from '../../services/apiComments'

export function usePostComments() {
  const { postId: post } = useParams()
  const {
    isLoading,
    isError,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['post-comments', post],
    queryFn: ({ pageParam = 1 }) =>
      getPostComments({
        post,
        page: pageParam,
        pageSize: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      // console.log({ lastPage, allPages })
      const totalPages = Math.ceil(lastPage.count / 10)
      if (allPages.length < totalPages) return allPages.length + 1
      else return undefined
    },
  })

  const comments = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.comments]
  }, [])

  const totalComments = data?.pages?.at(0)?.count

  return {
    comments,
    totalComments,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }
}
// export function usePostComments() {
//   const { postId: post } = useParams()
//   const {
//     isFetching,
//     isLoading,
//     data: { totalComments, comments } = {},
//   } = useQuery({
//     queryKey: ['post-comments', post],
//     queryFn: () => getPostComments({ post }),
//   })
//   return { isFetching, isLoading, totalComments, comments }
// }
