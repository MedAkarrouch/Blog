import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removePostFromReadingList as removePostFromReadingListApi } from '../../services/apiReadingList'
import { toast } from 'react-hot-toast'
import { handleError } from '../../utils/utils'

export function useRemovePostFromReadingList() {
  const queryClient = useQueryClient()
  const { isLoading, mutate: removePostFromReadingList } = useMutation({
    mutationFn: (post) => removePostFromReadingListApi({ post }),
    onSuccess: () => {
      toast.success('Successfully removed from the reading list')
      queryClient.invalidateQueries()
    },
    onError: (err) => handleError(err),
  })
  return { isLoading, removePostFromReadingList }
}
