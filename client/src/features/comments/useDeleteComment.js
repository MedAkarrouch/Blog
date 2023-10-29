import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteComment as deleteCommentApi } from '../../services/apiComments'
import { handleError } from '../../utils/utils'

export function useDeleteComment() {
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: ({ comment }) => {
      toast.success('Comment successfully deleted')
      queryClient.invalidateQueries(['post', comment.post])
    },
    onError: (err) => handleError(err),
  })
  return { isDeleting, deleteComment }
}
