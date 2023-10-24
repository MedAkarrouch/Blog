import { useQuery } from '@tanstack/react-query'
import { getReadingList } from '../../services/apiReadingList'
import { useSearchParams } from 'react-router-dom'
import {
  MAX_POSTS_ON_DASHBOARD,
  sortByReadingListArr,
} from '../../utils/constants'
export function useReadingList() {
  const [searchParams] = useSearchParams()
  let data = {}
  let queryKeyArr = ['reading-list']
  if (window.location.pathname === '/readingList') {
    const page = Number(searchParams.get('page')) || 1
    const pageSize = MAX_POSTS_ON_DASHBOARD
    let sortBy = searchParams.get('sortBy')
    sortBy = sortByReadingListArr.some((item) => sortBy === item.value)
      ? sortBy
      : sortByReadingListArr.at(0).value

    data = { page, pageSize, sortBy }
    // queryKeyArr.push(page)
    queryKeyArr = [...queryKeyArr, page, sortBy]
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
