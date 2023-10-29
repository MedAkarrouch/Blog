import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateMe as updateMeApi } from '../../services/apiAuth'
import { handleError } from '../../utils/utils'

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { mutate: updateMe, isLoading: isUpdating } = useMutation({
    mutationFn: updateMeApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
      toast.success('User account successfully updated')
    },
    onError: (err) => handleError(err),
  })
  return { isUpdating, updateMe }
}
