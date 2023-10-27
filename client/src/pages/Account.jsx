import styled, { css } from 'styled-components'
import Heading from '../ui/Heading'
import UpdateUserDataForm from '../features/account/UpdateUserDataForm'
import UpdateUserPassword from '../features/account/UpdateUserPassword'
import DeleteAccount from '../features/account/DeleteAccount'
import Main from '../ui/Main'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import { useEffect } from 'react'
import { useWindowTitle } from '../hooks/useWindowTitle'

const StyledMain = styled(Main)`
  background-color: var(--color-grey-50);
  padding: 2rem 2rem 5rem 2rem;
`

const StyledContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`
const StyledHeading = styled(Heading)`
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      max-width: 90rem;
      margin: 0 auto;
      margin-bottom: 3rem;
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
`

function Account() {
  useWindowTitle('Account')
  return (
    <>
      <Header />
      <StyledMain>
        <StyledHeading as="h2">Account</StyledHeading>

        <StyledContent>
          <UpdateUserDataForm>
            <StyledHeading as="h3">Update user data</StyledHeading>
          </UpdateUserDataForm>

          <UpdateUserPassword>
            <StyledHeading as="h3">Update password</StyledHeading>
          </UpdateUserPassword>
          <DeleteAccount>
            <StyledHeading as="h3">Delete account</StyledHeading>
          </DeleteAccount>
        </StyledContent>
      </StyledMain>
      <Footer />
    </>
  )
}

export default Account
