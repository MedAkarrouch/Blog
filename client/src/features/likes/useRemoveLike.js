import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeLike as removeLikeApi } from '../../services/apiLikes'
import { useParams } from 'react-router-dom'
import { handleError } from '../../utils/utils'

export function useRemoveLike() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading: isRemovingLike, mutate: removeLike } = useMutation({
    mutationFn: () => removeLikeApi({ post }),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (err) => handleError(err),
  })
  return { isRemovingLike, removeLike }
}
