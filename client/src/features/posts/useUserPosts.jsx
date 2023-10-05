import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserPosts } from '../../services/apiPosts'
import { useSearchParams } from 'react-router-dom'
import { MAX_POSTS_ON_DASHBOARD } from '../../utils/constants'

export function useUserPosts() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const { isLoading, data: { posts, count } = {} } = useQuery({
    queryKey: ['user-posts', page],
    queryFn: () => getUserPosts({ page, pageSize: MAX_POSTS_ON_DASHBOARD }),
  })
  // Prefetch the data
  if (count) {
    const totalPages = Math.ceil(count / MAX_POSTS_ON_DASHBOARD)
    page < totalPages &&
      queryClient.prefetchQuery({
        queryKey: ['user-posts', page + 1],
        queryFn: () =>
          getUserPosts({ page: page + 1, pageSize: MAX_POSTS_ON_DASHBOARD }),
      })
    page > 1 &&
      queryClient.prefetchQuery({
        queryKey: ['user-posts', page - 1],
        queryFn: () =>
          getUserPosts({ page: page - 1, pageSize: MAX_POSTS_ON_DASHBOARD }),
      })
  }

  return { isLoading, posts, count }
}
