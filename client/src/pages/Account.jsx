import styled, { css } from "styled-components"
import Heading from "../ui/Heading"
import UpdateUserDataForm from "../features/account/UpdateUserDataForm"
import UpdateUserPassword from "../features/account/UpdateUserPassword"

const StyledAccount = styled.div`
  background-color: var(--color-grey-50);
  height: calc(100vh - 7rem);
  overflow-y: auto;
  padding: 4rem 2rem;
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
    props.as === "h2" &&
    css`
      font-size: 3.5rem;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
    `}
`
function Account() {
  return (
    <StyledAccount>
      <StyledContent>
        {/* <StyledHeading as="h2">Update your account</StyledHeading>

        <UpdateUserDataForm>
          <StyledHeading as="h3">Update user data</StyledHeading>
        </UpdateUserDataForm> */}

        <UpdateUserPassword>
          <StyledHeading as="h3">Update password</StyledHeading>
        </UpdateUserPassword>
      </StyledContent>
    </StyledAccount>
  )
}

export default Account
