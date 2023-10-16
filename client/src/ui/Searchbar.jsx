import styled, { css } from 'styled-components'
import { HiOutlineMagnifyingGlass, HiArrowSmallLeft } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useWindowListener } from '../hooks/useWindowListener'

const StyledSearchbar = styled.form`
  /* box-shadow: var(--shadow-sm); */
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr 6rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 50px;
  overflow: hidden;
  width: 45rem;
  transition: width 0.2s ease-in;
  transform-origin: center;
  ${(props) =>
    props.mobile &&
    css`
      border: none;
      border-radius: 50px;
      grid-template-columns: 1fr;
      width: unset;
      justify-self: end;
    `}
  ${(props) =>
    props['show-searchbar-only'] &&
    css`
      display: grid;
      grid-template-columns: 1fr 6rem;
      width: 100%;
    `}
`
const Container = styled.div`
  display: grid;
  align-items: center;
  gap: 2rem;
  grid-template-columns: 4rem 1fr;
`

const Input = styled.input`
  color: var(--color-grey-600);
  padding: 0.8rem 1.2rem;
  padding: 1rem 2rem;
  border: none;
  display: block;
  width: 100%;
  font-size: 1.5rem;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  &::placeholder {
    color: var(--color-grey-400);
  }
  &:focus {
    outline: 2px solid var(--color-orange-400);
  }
`

const SearchBtn = styled.button.attrs({ title: 'Search' })`
  border: none;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: stretch;
  &:hover,
  &:focus {
    outline: none;
    background-color: var(--color-grey-100);
  }
  & svg {
    stroke-width: 2.5;
    font-size: 2rem;
    color: var(--color-grey-400);
  }
  ${(props) =>
    props.mobile &&
    css`
      justify-self: end;
      width: 4rem;
      height: 4rem;
      background-color: transparent;
    `}
  ${(props) =>
    props['show-searchbar-only'] &&
    css`
      background-color: transparent;
      & svg {
        color: var(--color-grey-500);
        stroke-width: 0.5;
        font-size: 3rem;
      }
      border-radius: 50%;
    `}
`

function Searchbar({ showSearchbarOnly, setShowSearchbarOnly }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('search') || '')
  const inputRef = useRef(null)

  const [isOnMobileScreen, setIsOnMobileScreen] = useState(
    window.innerWidth <= 600,
  )
  const checkIsOnMobile = () => {
    if (window.innerWidth <= 600) setIsOnMobileScreen(true)
    else {
      setIsOnMobileScreen(false)
      setShowSearchbarOnly(false)
    }
  }
  useWindowListener(checkIsOnMobile)

  const setParams = (val) => {
    searchParams.set('search', val)
    setSearchParams(searchParams)
  }
  const onClear = () => {
    setSearch('')
    if (searchParams.has('search')) {
      searchParams.delete('search')
      setSearchParams(searchParams)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    inputRef.current?.blur()
    // if (showSearchbarOnly) setShowSearchbarOnly(false)
    if (!search) {
      searchParams.delete('search')
      setSearchParams(searchParams)
      return
    }
    setParams(search)
  }

  if (showSearchbarOnly)
    return (
      <Container>
        <SearchBtn
          show-searchbar-only={'true'}
          onClick={() => setShowSearchbarOnly(false)}
        >
          <HiArrowSmallLeft />
        </SearchBtn>
        <StyledSearchbar onSubmit={onSubmit} show-searchbar-only={'true'}>
          <Input
            ref={inputRef}
            placeholder="Search"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchBtn>
            <HiOutlineMagnifyingGlass />
          </SearchBtn>
        </StyledSearchbar>
      </Container>
    )
  else
    return (
      <StyledSearchbar
        mobile={isOnMobileScreen ? 'mobile' : ''}
        onSubmit={onSubmit}
      >
        {isOnMobileScreen ? (
          <SearchBtn mobile="true" onClick={() => setShowSearchbarOnly(true)}>
            <HiOutlineMagnifyingGlass />
          </SearchBtn>
        ) : (
          <>
            <Input
              ref={inputRef}
              placeholder="Search"
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchBtn>
              <HiOutlineMagnifyingGlass />
            </SearchBtn>
          </>
        )}
      </StyledSearchbar>
    )
}

export default Searchbar
