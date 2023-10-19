import { useQuery } from '@tanstack/react-query'
import { getStats } from '../../services/apiPosts'

export function useStats() {
  const {
    isLoading,
    data: stats,
    isError,
  } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    retry: false,
  })
  return { isLoading, stats, isError }
}
