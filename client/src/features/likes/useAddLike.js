import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLike as addLikeApi } from '../../services/apiLikes'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
export function useAddLike() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading: isAddingLike, mutate: addLike } = useMutation({
    mutationFn: () => addLikeApi({ post }),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: () => toast.error('Something went wrong'),
  })
  return { isAddingLike, addLike }
}
