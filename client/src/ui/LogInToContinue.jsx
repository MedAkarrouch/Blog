import styled from "styled-components"
import Button from "../features/account/Button"
import Logo from "./Logo"
import { Link } from "react-router-dom"
const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 50rem;
`
const Text = styled.p`
  hyphens: unset;
  font-size: 2.25rem;
  font-weight: 500;
`
const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  button {
    width: 100%;
  }
`
function LogInToContinue() {
  return (
    <Container>
      <Logo />
      <Text>
        Login first to be able to post and comment on different arcticles
      </Text>
      <StyledButtonsContainer>
        <Link to="/login">
          <Button size="medium">Login</Button>
        </Link>
        <Link to="/signup">
          <Button size="medium" variation="secondary">
            Create account
          </Button>
        </Link>
      </StyledButtonsContainer>
    </Container>
  )
}

export default LogInToContinue
