import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateComment as updateCommentApi } from '../../services/apiComments'
import { toast } from 'react-hot-toast'
import { handleError } from '../../utils/utils'

export function useUpdateComment() {
  const queryClient = useQueryClient()
  const { isLoading: isUpdating, mutate: updateComment } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: ({ comment }) => {
      toast.success('Comment successfully updated')
      queryClient.invalidateQueries(['post', comment.post])
    },
    onError: (err) => handleError(err),
  })
  return { isUpdating, updateComment }
}
