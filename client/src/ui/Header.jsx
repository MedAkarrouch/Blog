import styled from "styled-components"
import Logo from "./Logo"
import Menu from "./Menu"
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid #eee;
  height: 7rem;
`

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <Menu />
    </StyledHeader>
  )
}

export default Header
