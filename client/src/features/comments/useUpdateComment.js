import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editComment as editCommentApi } from "../../services/apiPosts"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"

export function useUpdateComment() {
  const { postId: post } = useParams()
  const queryClient = useQueryClient()
  const { isLoading: isUpdating, mutate: updateComment } = useMutation({
    mutationFn: (comment) => editCommentApi({ comment, post }),
    onSuccess: (post) => {
      toast.success("Comment successfully updated")
      queryClient.setQueryData(["post", post._id], post)
    },
    onError: () => toast.error("Something went wrong")
  })
  return { isUpdating, updateComment }
}
