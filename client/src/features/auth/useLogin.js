import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'

export function useLogin() {
  const queryClient = useQueryClient()
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
      toast.success('Successfully logged in')
    },
    onError: (err) => {
      console.log('Err = ', err)
      if (err.code === 'ERR_NETWORK') return toast.error('Something went wrong')
      toast.error('Provided email or password is incorrect')
    },
  })
  return { isLoading, login }
}
