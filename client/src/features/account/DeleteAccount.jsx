import Button from "./Button"
import styled from "styled-components"
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`
function DeleteAccount() {
  return (
    <Container>
      <Button size="large" variation="danger">
        Delete account
      </Button>
    </Container>
  )
}

export default DeleteAccount
