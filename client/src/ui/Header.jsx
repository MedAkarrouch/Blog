import styled from 'styled-components'
import Logo from './Logo'
import Menu from './Menu'
import LoggedInUserMenu from './LoggedInUserMenu'
import { useUser } from '../features/auth/useUser'
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: rgba(255, 255, 255, 0.97); */
  background-color: #fff;
  border-bottom: 1px solid #eee;
  height: 7rem;
`

function Header() {
  const { isLoading, user, isAuthenticated } = useUser()
  return (
    <StyledHeader>
      <Logo />
      {isLoading ? null : isAuthenticated ? (
        <LoggedInUserMenu user={user} />
      ) : (
        <Menu />
      )}
    </StyledHeader>
  )
}

export default Header
