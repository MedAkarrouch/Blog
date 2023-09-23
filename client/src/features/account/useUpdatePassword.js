import { useMutation } from "@tanstack/react-query"
import { updatePassword as updatePasswordApi } from "../../services/apiAuth"
import { handleError } from "../../utils/utils"
import { toast } from "react-hot-toast"

export function useUpdatePassword() {
  const { isLoading: isUpdating, mutate: updatePassword } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success("User password successfully updated")
    },
    onError: (err) => handleError(err)
  })
  return { isUpdating, updatePassword }
}
