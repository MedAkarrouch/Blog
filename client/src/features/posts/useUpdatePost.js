import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost as updatePostApi } from '../../services/apiPosts'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function useUpdatePost() {
  const queryClient = useQueryClient()
  const { postId: post } = useParams()
  const { isLoading: isUpdating, mutate: updatePost } = useMutation({
    mutationFn: (data) => updatePostApi(post, data),
    onSuccess: (response) => {
      toast.success('Post successfully updated')
      console.log(response)
      queryClient.invalidateQueries(['post', response?.data?.data?.post?._id])
    },
    onError: (err) => {
      if (err.message === 'Network Error')
        return toast.error('Something went wrong Try again later')
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
  return { isUpdating, updatePost }
}
