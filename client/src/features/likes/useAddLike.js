import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLike as addLikeApi } from '../../services/apiLikes'
import { useParams } from 'react-router-dom'
import { handleError } from '../../utils/utils'
export function useAddLike() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading: isAddingLike, mutate: addLike } = useMutation({
    mutationFn: () => addLikeApi({ post }),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (err) => handleError(err),
  })
  return { isAddingLike, addLike }
}
