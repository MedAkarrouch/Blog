import styled from 'styled-components'
const StyledMain = styled.main`
  margin-top: 8rem;
  padding: 0 2rem;
`

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>
}

export default Main
