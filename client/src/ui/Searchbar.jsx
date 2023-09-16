import styled from "styled-components"
import { HiOutlineMagnifyingGlass, HiMiniXCircle } from "react-icons/hi2"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

// import { categories as categoriesArr, searchForArr } from "../utils/constants"

import SelectResults from "../features/posts/SelectResults"
// const categories = ["All", ...categoriesArr]

const StyledSearchbar = styled.form`
  display: grid;
  /* grid-template-columns: minmax(40rem, 4fr) min-content minmax(10rem, 1fr); */
  grid-template-columns: minmax(40rem, 4fr) min-content 8rem;
  /* grid-template-columns: minmax(40rem, 3fr) min-content minmax(20rem, 1.2fr); */
  column-gap: 3rem;
  max-width: 90rem;
  margin: 0 auto;
  padding: 1rem 2.5rem;
  box-shadow: var(--shadow);
  border-radius: 10px;
  position: relative;
  /* box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px; */
`

const Input = styled.input`
  color: var(--color-grey-600);
  padding: 0.8rem 1.2rem;
  border: none;
  display: block;
  width: 50rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`
const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & svg {
    font-size: 2rem;
    color: var(--color-grey-400);
  }
  & > svg:first-child {
    stroke-width: 2.5;
  }
  & svg:last-child {
    cursor: pointer;
  }
`
const Line = styled.div`
  display: block;
  background-color: #eee;
  width: 2px;
  /* align-self: stretch; */
  height: 100%;
`

function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get("search") || "")

  const setParams = (val) => {
    searchParams.set("search", val)
    setSearchParams(searchParams)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    setParams(search)
  }
  const onClear = () => {
    setSearch("")
    if (searchParams.has("search")) {
      searchParams.delete("search")
      setSearchParams(searchParams)
    }
  }

  return (
    <StyledSearchbar onSubmit={onSubmit}>
      <InputBox>
        <HiOutlineMagnifyingGlass />
        <Input
          placeholder="Search..."
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <HiMiniXCircle type="submit" onClick={onClear} />
      </InputBox>
      <Line>&nbsp;</Line>
      <SelectResults />
    </StyledSearchbar>
  )
}

export default Searchbar
