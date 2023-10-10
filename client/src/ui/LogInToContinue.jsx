import styled from 'styled-components'
import Button from '../features/account/Button'
import Logo from './Logo'
import { Link } from 'react-router-dom'
const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  /* gap: 3rem; */
  max-width: 50rem;
  padding: 1rem 0;
`
const Text = styled.p`
  hyphens: unset;
  font-size: 2.25rem;
  /* font-size: 1.8rem; */
  font-weight: 500;
  margin-bottom: 3rem;
  margin-top: 2rem;
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
        {/* Unlock the full potential of our blog by logging in! Once you're logged
        in, you can enjoy features like posting comments, saving your favorite
        articles, and more. */}
        Log in to access all blog features!
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
