import styled from "styled-components"
import UpdateUserDataForm from "../features/account/UpdateUserDataForm"

const StyledSettings = styled.div`
  background-color: var(--color-grey-50);
  height: calc(100vh - 7rem);
  overflow-y: auto;
  padding: 4rem 2rem;
`
const StyledContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
`
function Account() {
  return (
    <StyledSettings>
      <StyledContent>
        <UpdateUserDataForm />
      </StyledContent>
    </StyledSettings>
  )
}

export default Account
