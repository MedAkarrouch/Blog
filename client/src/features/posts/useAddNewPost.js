import { useMutation } from "@tanstack/react-query"
import { addNewPost as addNewPostApi } from "../../services/apiPosts"
import { toast } from "react-hot-toast"

export function useAddNewPost() {
  const { mutate: addNewPost, isLoading } = useMutation({
    mutationFn: addNewPostApi,
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
