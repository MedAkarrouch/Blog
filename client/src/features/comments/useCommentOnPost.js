import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentOnPost as commentOnPostApi } from "../../services/apiPosts"
import { useParams } from "react-router-dom"
import { toast } from "react-hot-toast"

export function useCommentOnPost() {
  const { postId: post } = useParams()
  const queryClient = useQueryClient()

  const { isLoading, mutate: commentOnPost } = useMutation({
    mutationFn: (comment) => commentOnPostApi({ post, comment }),
    onSuccess: (post) => {
      toast.success("Comment successfully added")
      queryClient.setQueryData(["post", post._id], post)
    },
    onError: () => toast.error("Something went wrong")
  })
  return { isLoading, commentOnPost }
}
