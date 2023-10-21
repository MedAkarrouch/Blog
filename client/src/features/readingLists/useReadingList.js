import { useQuery } from '@tanstack/react-query'
import { getReadingList } from '../../services/apiReadingList'
export function useReadingList() {
  const {
    isLoading,
    isError,
    data: { count, readingList } = {},
  } = useQuery({
    queryKey: ['reading-list'],
    queryFn: getReadingList,
    retry: false,
  })
  return { isLoading, isError, count, readingList }
}
