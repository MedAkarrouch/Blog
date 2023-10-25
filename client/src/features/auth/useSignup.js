import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signup as signupApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'

export function useSignup() {
  const queryClient = useQueryClient()
  const {
    isLoading,
    mutate: signup,
    error,
    isError,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
      toast.success('Account created successfully')
    },
    onError: (err) => {
      console.log(err)
      // Server is down
      if (err.code === 'ERR_NETWORK') return toast.error('Something went wrong')
      //
      const {
        validationErrors,
        data: { message },
      } = err.response?.data
      if (validationErrors)
        [...validationErrors].reverse().forEach((element, index) => {
          toast.error(element.error, { id: index + 1 })
        })
      else if (message) toast.error(message)
    },
  })
  return { isLoading, signup, isError, error }
}
