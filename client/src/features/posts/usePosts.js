import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../../services/apiPosts"
import { useSearchParams } from "react-router-dom"

export function usePosts() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || "all"

  console.log({ search, category })

  const {
    data: posts,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ["posts", search, category],
    queryFn: () => getPosts({ search, category })
  })
  return { isLoading, posts }
}
