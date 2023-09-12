import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"

export function useUser() {
  const queryClient = useQueryClient()
  const {
    isLoading,
    isError,
    data: user,
    error
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false
  })
  if (isError) queryClient.setQueryData(["user"], null)
  return {
    isLoading,
    isError,
    user,
    error,
    isAuthenticated: user ? true : false
  }
}
