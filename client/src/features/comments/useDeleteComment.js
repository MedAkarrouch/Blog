import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { deleteComment as deleteCommentApi } from "../../services/apiPosts"
export function useDeleteComment() {
  const { postId: post } = useParams()
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate: deleteComment } = useMutation({
    mutationFn: () => deleteCommentApi(`post`),
    onSuccess: (post) => {
      toast.success("Comment successfully deleted")
      queryClient.setQueryData(["post", post._id], post)
    },
    onError: () => toast.error("Something went wrong")
  })
  return { isDeleting, deleteComment }
}
