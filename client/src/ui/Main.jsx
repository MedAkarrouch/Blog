import styled, { css } from 'styled-components'
const Main = styled.main`
  margin-top: 7rem;
  padding: 0 2rem;
  ${(props) =>
    props.page === 'home' &&
    css`
      min-height: calc(100vh - 18rem);
      /* height: ; */
      margin-top: 10rem;
    `}
`

export default Main
