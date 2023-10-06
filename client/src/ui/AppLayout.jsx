import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const StyledMain = styled.main`
  /* background-color: var(--color-grey-50); */
  margin-top: 7rem;
`

function AppLayout() {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  )
}

export default AppLayout
