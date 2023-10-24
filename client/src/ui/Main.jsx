import styled, { css } from 'styled-components'
const Main = styled.main`
  margin-top: 7rem;
  padding: 0 2rem;
  ${(props) =>
    props.page === 'home' &&
    css`
      margin-top: 10rem;
      min-height: calc(100vh - 20rem);
    `}
`

export default Main
