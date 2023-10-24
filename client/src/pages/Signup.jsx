import styled from 'styled-components'

import Logo from '../ui/Logo'
import { useIsLoggedIn } from '../features/auth/useIsLoggedIn'
import SignupForm from '../features/auth/SignupForm'
import Spinner from '../ui/Spinner'

const SignupLayout = styled.main`
  display: grid;
  grid-template-columns: 48rem;
  justify-content: center;
  align-content: center;
  padding: 3rem 2rem;
  min-height: 100vh;
  background-color: var(--color-grey-50);
  @media screen and (max-width: 25em) {
    grid-template-columns: 1fr;
  }
`
const Wrapper = styled.div`
  margin-bottom: 1rem;
`
function Signup() {
  const { isLoggedIn, isLoading } = useIsLoggedIn()
  if (isLoading)
    return (
      <Spinner.Wrapper>
        <Spinner />
      </Spinner.Wrapper>
    )
  else if (!isLoggedIn)
    return (
      <SignupLayout>
        <Wrapper>
          <Logo includeLink={false} />
        </Wrapper>
        <SignupForm />
      </SignupLayout>
    )
  else return null
}

export default Signup
