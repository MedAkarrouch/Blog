import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeLike as removeLikeApi } from '../../services/apiLikes'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
export function useRemoveLike() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading: isRemovingLike, mutate: removeLike } = useMutation({
    mutationFn: () => removeLikeApi({ post }),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => toast.error('Something went wrong'),
  })
  return { isRemovingLike, removeLike }
}
