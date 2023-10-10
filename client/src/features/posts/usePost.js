import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPost } from '../../services/apiPosts'
import { COMMENTS_PER_PAGE } from '../../utils/constants'

export function usePost() {
  const { postId } = useParams()
  const {
    isLoading,
    data,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['post', postId],
    queryFn: ({ pageParam = 1 }) =>
      getPost({
        postId,
        commentsPage: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.commentsCount / COMMENTS_PER_PAGE)
      if (allPages.length < totalPages) return allPages.length + 1
      else return undefined
    },
  })
  //
  const post = data?.pages?.at(0)
  const comments = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.comments]
  }, [])
  //
  return {
    isLoading,
    post,
    comments,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  }
}
// export function usePost() {
//   const { postId } = useParams()
//   const {
//     isLoading,
//     data: post,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['post', postId],
//     queryFn: (data) => getPost({ postId, ...data }),
//     retry: false,
//   })
//   return {
//     isLoading,
//     post,
//     isError,
//     error,
//   }
// }
