import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMe as deleteMeApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useDeleteAccount() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading: isDeleting, mutate: deleteMe } = useMutation({
    mutationFn: deleteMeApi,
    onSuccess: () => {
      toast.success('Account successfully deleted')
      queryClient.invalidateQueries()
      navigate('/', { replace: true })
    },
    onError: (err) => {
      const msg = 'Something went wrong'
      if (err?.response?.status === 401)
        toast.error(err?.response?.data?.data?.message || msg)
      else toast.error(msg)
    },
  })
  return { isDeleting, deleteMe }
}
