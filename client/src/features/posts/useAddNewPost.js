import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { addNewPost as addNewPostApi } from "../../services/apiPosts"

export function useAddNewPost() {
  const navigate = useNavigate()
  const { mutate: addNewPost, isLoading } = useMutation({
    mutationFn: addNewPostApi,
    onSuccess: (data) => {
      const { _id: postId } = data.data.data.post
      toast.success("Post successfully created")
      navigate(`/post/${postId}`, { replace: true })
    },
    onError: (err) => {
      if (err.message === "Network Error")
        toast.error("Something went wrong Try again later")
      //
      const {
        validationErrors,
        data: { message }
      } = err.response?.data
      if (validationErrors)
        [...validationErrors].reverse().forEach((element, index) => {
          toast.error(element.error, { id: index + 1 })
        })
      else if (message) toast.error(message)
    }
  })
  return { addNewPost, isLoading }
}
