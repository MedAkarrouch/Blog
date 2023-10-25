import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { HiOutlineUserCircle } from 'react-icons/hi2'
const StyledMenu = styled.menu`
  display: flex;
  align-items: center;
  gap: 3rem;
`
const Button = styled(Link)`
  background: none;
  border: none;
  /* padding: 1rem 2.5rem; */
  padding: 0.9rem 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 10px;
  ${(props) =>
    props.type === 'login' &&
    css`
      color: var(--color-orange-400);
      border: 2px solid currentColor;
      &:hover {
        background-color: var(--color-orange-400);
        color: #fff;
        border: 2px solid var(--color-orange-400);
        /* border: none; */
      }
    `}
  ${(props) =>
    props.type === 'signup' &&
    css`
      background-color: var(--color-orange-400);
      color: #fff;
      border: 2px solid transparent;
      &:hover {
        background-color: var(--color-orange-500);
      }
      @media screen and (max-width: 50em) {
        display: none;
      }
    `}
`

function Menu() {
  return (
    <StyledMenu>
      <Button type="login" to="/login">
        Log In
      </Button>
      {/* <Button type="signin" to="/signup">
        <HiOutlineUserCircle />
        <span>Sign In</span>
      </Button> */}
      <Button type="signup" to="/signup">
        Create account
      </Button>
    </StyledMenu>
  )
}

export default Menu
