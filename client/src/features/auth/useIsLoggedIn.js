import { useNavigate } from "react-router-dom"
import { useUser } from "./useUser"
import { useEffect } from "react"

export function useIsLoggedIn() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useUser()
  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate("/", { replace: true })
  }, [navigate, isLoading, isAuthenticated])
  return { isLoading, isLoggedIn: isAuthenticated }
}
