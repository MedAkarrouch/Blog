import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPostToReadingList as addPostToReadingListApi } from '../../services/apiReadingList'
import { toast } from 'react-hot-toast'
import { handleError } from '../../utils/utils'

export function useAddPosttoReadingList() {
  const queryClient = useQueryClient()
  const { isLoading, mutate: addPostToReadingList } = useMutation({
    mutationFn: (post) => addPostToReadingListApi({ post }),
    onSuccess: () => {
      toast.success('Successfully added to the reading list')
      queryClient.invalidateQueries()
    },
    onError: (err) => handleError(err),
  })
  return { isLoading, addPostToReadingList }
}
