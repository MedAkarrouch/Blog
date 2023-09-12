import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../../services/apiPosts"
export function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  })
  return { isLoading, posts }
}
