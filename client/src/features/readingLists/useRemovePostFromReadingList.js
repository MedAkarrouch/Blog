import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removePostFromReadingList as removePostFromReadingListApi } from '../../services/apiReadingList'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

export function useRemovePostFromReadingList() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading, mutate: removePostFromReadingList } = useMutation({
    mutationFn: (data) => removePostFromReadingListApi({ post, ...data }),
    onSuccess: () => {
      toast.success('Successfully removed from the reading list')
      queryClient.invalidateQueries()
    },
    onError: () => toast.error('Something went wrong'),
  })
  return { isLoading, removePostFromReadingList }
}
