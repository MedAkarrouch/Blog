import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment as addCommentApi } from '../../services/apiComments'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

export function useAddComment() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading: isAddingComment, mutate: addComment } = useMutation({
    mutationFn: (comment) => addCommentApi({ comment, post }),
    onSuccess: ({ comment }) => {
      toast.success('Comment successfully added')
      queryClient.invalidateQueries(['post-comments', comment.post])
    },
    onError: () => toast.error('Something went wrong'),
  })
  return { isAddingComment, addComment }
}
