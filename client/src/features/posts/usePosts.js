import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts } from '../../services/apiPosts'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export function usePosts() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'all'
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', search, category],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({
        search,
        category,
        page: pageParam,
        pageSize: PAGE_SIZE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.count / PAGE_SIZE)
      return allPages.length < maxPages ? allPages.length + 1 : undefined
    },
    retry: false,
  })

  const posts = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.posts]
  }, [])

  return {
    posts,
    postsCount: data?.pages?.at(0)?.count,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }
}

// export function usePosts() {
//   const [searchParams] = useSearchParams()
//   const search = searchParams.get("search") || ""
//   const category = searchParams.get("category") || "all"
//   const page = +searchParams.get("page") ? +searchParams.get("page") : 1
//   const pageSize = PAGE_SIZE

//   console.log({ search, category })

//   const {
//     data: { posts, count } = {},
//     isLoading,
//     error,
//     isError
//   } = useQuery({
//     queryKey: ["posts", search, category, `page=${page}`],
//     queryFn: () => getPosts({ search, category, page, pageSize })
//   })
//   return { isLoading, posts, count }
// }
