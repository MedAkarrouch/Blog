import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPostToReadingList as addPostToReadingListApi } from '../../services/apiReadingList'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

export function useAddPosttoReadingList() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading, mutate: addPostToReadingList } = useMutation({
    mutationFn: () => addPostToReadingListApi({ post }),
    onSuccess: () => {
      toast.success('Successfully added to the reading list')
      queryClient.invalidateQueries()
    },
    onError: () => toast.error('Something went wrong'),
  })
  return { isLoading, addPostToReadingList }
}
