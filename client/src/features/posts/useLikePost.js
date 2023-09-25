import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { likePost as likePostApi } from "../../services/apiPosts"
import { useParams } from "react-router-dom"

export function useLikePost() {
  const { postId } = useParams()
  const queryClient = useQueryClient()
  const { isLoading, mutate: likePost } = useMutation({
    mutationFn: () => likePostApi(postId),
    onSuccess: (post) => {
      console.log(post)
      queryClient.setQueryData(["post", post._id], post)
    },
    onError: () => toast.error("Something went wrong")
  })
  return { isLoading, likePost }
}
