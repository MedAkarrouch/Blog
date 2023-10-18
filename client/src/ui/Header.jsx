import styled, { css } from 'styled-components'
import Logo from './Logo'
import Menu from './Menu'
import LoggedInUserMenu from './LoggedInUserMenu'
import { useUser } from '../features/auth/useUser'
import Searchbar from './Searchbar'
import { useState } from 'react'
import SpinnerMini from './SpinnerMini'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 0 2rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  height: 7rem;
  @media screen and (max-width: 43.75em) {
    /* padding: 0 2rem; */
  }
`
const Content = styled.div`
  max-width: 125rem;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: min-content 1fr max-content;
  /* min-content 1fr max-content; */
  align-items: center;
  column-gap: 3rem;
  /* Hide search in components */
  ${(props) =>
    props['hide-searchbar'] &&
    css`
      grid-template-columns: min-content max-content;
      justify-content: space-between;
    `}
  ${(props) =>
    props['show-searchbar-only'] &&
    css`
      grid-template-columns: 1fr;
    `}
`

function Header({ hideSearchbar = true }) {
  const { isLoading, user, isAuthenticated } = useUser()

  const [showSearchbarOnly, setShowSearchbarOnly] = useState(false)

  if (showSearchbarOnly)
    return (
      <StyledHeader>
        <Content show-searchbar-only={'true'}>
          <Searchbar
            showSearchbarOnly={showSearchbarOnly}
            setShowSearchbarOnly={setShowSearchbarOnly}
          />
        </Content>
      </StyledHeader>
    )
  else
    return (
      <StyledHeader>
        <Content hide-searchbar={hideSearchbar ? 'true' : ''}>
          <Logo />
          {!hideSearchbar && (
            <Searchbar
              showSearchbarOnly={showSearchbarOnly}
              setShowSearchbarOnly={setShowSearchbarOnly}
            />
          )}
          {isLoading ? (
            <SpinnerMini color="var(--color-orange-400)" />
          ) : isAuthenticated ? (
            <LoggedInUserMenu user={user} />
          ) : (
            <Menu />
          )}
        </Content>
      </StyledHeader>
    )
}

export default Header
