import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../../services/apiPosts'

export function useUserPosts() {
  const { isLoading, data: { posts, count } = {} } = useQuery({
    queryKey: ['user-posts'],
    queryFn: getUserPosts,
  })
  return { isLoading, posts, count }
}
