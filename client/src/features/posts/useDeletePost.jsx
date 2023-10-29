import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost as deletePostApi } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'
import { handleError } from '../../utils/utils'

export function useDeletePost() {
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success('Post successfully deleted')
      queryClient.invalidateQueries()
    },
    onError: (err) => handleError(err),
  })
  return { isDeleting, deletePost }
}
