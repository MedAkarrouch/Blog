import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getPost } from "../../services/apiPosts"

export function usePost() {
  const { postId } = useParams()
  const {
    isLoading,
    data: post,
    isError,
    error
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    retry: false
  })
  console.log(error)
  return {
    isLoading,
    post,
    isError,
    error
  }
}
