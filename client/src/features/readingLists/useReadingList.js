import { useQuery } from '@tanstack/react-query'
import { getReadingList } from '../../services/apiReadingList'
import { useSearchParams } from 'react-router-dom'
import { MAX_POSTS_ON_DASHBOARD } from '../../utils/constants'
export function useReadingList() {
  const [searchParams] = useSearchParams()
  let data = {}
  let queryKeyArr = ['reading-list']
  if (window.location.pathname === '/readingList') {
    let page = Number(searchParams.get('page')) || 1
    let pageSize = MAX_POSTS_ON_DASHBOARD
    data = { page, pageSize }
    queryKeyArr.push(page)
  }
  const {
    isLoading,
    isError,
    data: { count, readingList } = {},
  } = useQuery({
    queryKey: queryKeyArr,
    queryFn: () => getReadingList(data),
    retry: false,
  })
  return { isLoading, isError, count, readingList }
}
