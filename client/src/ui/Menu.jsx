import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
const StyledMenu = styled.menu`
  display: flex;
  align-items: center;
  gap: 3rem;
`
const Button = styled(Link)`
  background: none;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 10px;
  ${(props) =>
    props.for === 'login' &&
    css`
      color: var(--color-orange-400);
      border: 2px solid currentColor;
    `}
  ${(props) =>
    props.for === 'signup' &&
    css`
      background-color: var(--color-orange-400);
      color: #fff;
      border: 2px solid transparent;
    `}
`
function Menu() {
  return (
    <StyledMenu>
      <Link to="/account">account</Link>
      <Link to="/dashboard">dashboard</Link>
      <Link to="/new">new</Link>
      <Button for="login" to="/login">
        Log In
      </Button>
      <Button for="signup" to="/signup">
        Create account
      </Button>
    </StyledMenu>
  )
}

export default Menu
