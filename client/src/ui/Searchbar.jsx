import styled, { css } from 'styled-components'
import { HiOutlineMagnifyingGlass, HiMiniXCircle } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

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
  ${(props) =>
    props['is-focused'] &&
    css`
      width: 45rem;
    `}
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
`

function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('search') || '')
  const [isFocused, setIsFocused] = useState(false)

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
    if (!search) {
      searchParams.delete('search')
      setSearchParams(searchParams)
      return
    }
    setParams(search)
  }

  return (
    <StyledSearchbar is-focused={isFocused ? 'true' : ''} onSubmit={onSubmit}>
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchBtn>
        <HiOutlineMagnifyingGlass />
      </SearchBtn>
    </StyledSearchbar>
  )
}

export default Searchbar
