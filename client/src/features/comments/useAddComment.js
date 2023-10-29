import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment as addCommentApi } from '../../services/apiComments'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { handleError } from '../../utils/utils'

export function useAddComment() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading: isAddingComment, mutate: addComment } = useMutation({
    mutationFn: (comment) => addCommentApi({ comment, post }),
    onSuccess: ({ comment }) => {
      toast.success('Comment successfully added')
      queryClient.invalidateQueries(['post', comment.post])
    },
    onError: (err) => handleError(err),
  })
  return { isAddingComment, addComment }
}
