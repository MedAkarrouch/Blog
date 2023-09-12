import { useEffect } from "react"
import { useUser } from "../features/auth/useUser"
import { Outlet, useNavigate } from "react-router-dom"
import Spinner from "./Spinner"

function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login", { replace: true })
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading)
    return (
      <Spinner.Wrapper subtract={"7rem"}>
        <Spinner />
      </Spinner.Wrapper>
    )
  else if (isAuthenticated) return <Outlet />
  else return null
}

export default ProtectedRoute
