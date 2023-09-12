import styled from "styled-components"
const StyledMenu = styled.menu``
const StyledList = styled.ul``
function Menu() {
  return (
    <StyledMenu>
      <StyledList>
        <button>Log In</button>
        <button>Log Out</button>
      </StyledList>
    </StyledMenu>
  )
}

export default Menu
