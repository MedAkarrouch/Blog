import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserPosts } from '../../services/apiPosts'
import { useSearchParams } from 'react-router-dom'
import {
  MAX_POSTS_ON_DASHBOARD,
  sortByDashboardArr,
} from '../../utils/constants'

export function useUserPosts() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  let sortBy = searchParams.get('sortBy')
  sortBy = sortByDashboardArr.some((item) => sortBy === item.value)
    ? sortBy
    : sortByDashboardArr.at(0).value

  const { isLoading, data: { posts, count } = {} } = useQuery({
    queryKey: ['user-posts', page, sortBy],
    queryFn: () =>
      getUserPosts({ page, pageSize: MAX_POSTS_ON_DASHBOARD, sortBy }),
    retry: false,
  })
  // Prefetch the data
  if (count) {
    const totalPages = Math.ceil(count / MAX_POSTS_ON_DASHBOARD)
    page < totalPages &&
      queryClient.prefetchQuery({
        queryKey: ['user-posts', page + 1, sortBy],
        queryFn: () =>
          getUserPosts({ page: page + 1, pageSize: MAX_POSTS_ON_DASHBOARD }),
        retry: false,
      })
    page > 1 &&
      queryClient.prefetchQuery({
        queryKey: ['user-posts', page - 1, sortBy],
        queryFn: () =>
          getUserPosts({ page: page - 1, pageSize: MAX_POSTS_ON_DASHBOARD }),
        retry: false,
      })
  }

  return { isLoading, posts, count }
}
