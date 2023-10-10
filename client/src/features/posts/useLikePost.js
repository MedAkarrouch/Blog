import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { likePost as likePostApi } from '../../services/apiPosts'
import { useParams } from 'react-router-dom'

export function useLikePost() {
  const { postId } = useParams()
  const queryClient = useQueryClient()
  const { isLoading, mutate: likePost } = useMutation({
    mutationFn: () => likePostApi(postId),
    onSuccess: (post) => {
      queryClient.invalidateQueries(['post', post._id])
    },
    onError: () => toast.error('Something went wrong'),
  })
  return { isLoading, likePost }
}
