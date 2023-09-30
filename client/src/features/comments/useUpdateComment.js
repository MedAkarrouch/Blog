import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateComment as updateCommentApi } from '../../services/apiComments'
import { toast } from 'react-hot-toast'

export function useUpdateComment() {
  const queryClient = useQueryClient()
  const { isLoading: isUpdating, mutate: updateComment } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: ({ comment }) => {
      toast.success('Comment successfully updated')
      console.log(comment.post)
      queryClient.invalidateQueries(['post-comments', comment.post])
    },
    onError: () => toast.error('Something went wrong'),
  })
  return { isUpdating, updateComment }
}
