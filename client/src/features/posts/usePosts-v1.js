import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../../services/apiPosts"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants"
export function usePosts() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || "all"
  const page = +searchParams.get("page") ? +searchParams.get("page") : 1
  const pageSize = PAGE_SIZE

  console.log({ search, category })

  const {
    data: { posts, count } = {},
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ["posts", search, category, `page=${page}`],
    queryFn: () => getPosts({ search, category, page, pageSize })
  })
  return { isLoading, posts, count }
}
