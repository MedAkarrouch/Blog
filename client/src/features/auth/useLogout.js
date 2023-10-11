import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'

export function useLogout() {
  const queryClient = useQueryClient()
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: () => toast.error('Something went wrong'),
  })
  return { isLoading, logout }
}
