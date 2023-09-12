import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import { toast } from "react-hot-toast"

export function useLogin() {
  const queryClient = useQueryClient()
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user)
      toast.success("Successfully logged in")
    },
    onError: () => toast.error("Provided email or password is incorrect")
  })
  return { isLoading, login }
}
