import styled from 'styled-components'
import LoginForm from '../features/auth/LoginForm'
import Logo from '../ui/Logo'
import Spinner from '../ui/Spinner'
import { useIsLoggedIn } from '../features/auth/useIsLoggedIn'

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 48rem;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  background-color: var(--color-grey-50);
`

const Wrapper = styled.div`
  margin-bottom: 1rem;
`

function Login() {
  const { isLoading, isLoggedIn } = useIsLoggedIn()

  if (isLoading)
    return (
      <Spinner.Wrapper>
        <Spinner />
      </Spinner.Wrapper>
    )
  else if (!isLoggedIn)
    return (
      <LoginLayout>
        <Wrapper>
          <Logo includeLink={false} />
        </Wrapper>
        <LoginForm />
      </LoginLayout>
    )
  else return null
}

export default Login
