import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi2"
import { useSearchParams } from "react-router-dom"
import styled, { css } from "styled-components"
import { PAGE_SIZE, MIN_PAGES } from "../utils/constants"

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`
const List = styled.ul`
  display: flex;
  gap: 1rem;
`
const Item = styled.li`
  color: var(--color-grey-600);
  font-size: 1.6rem;
  border-radius: 100%;
  font-weight: 500;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-200);
  }
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-grey-200);
    `};
`
const Button = styled.button`
  display: block;
  background-color: #fff;
  border: none;
  &:disabled {
    color: var(--color-grey-300);
  }
  & svg {
    font-size: 2rem;
    stroke-width: 3;
  }
`

const generateItems = (start, end) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (pageCount < 2) return null

  const currentPage = +searchParams.get("page") || 1
  let items
  console.log({ count, pageCount })
  // we use the MIN_PAGES to determine whether we display the dots or not
  const showLeftDots = pageCount < MIN_PAGES ? false : currentPage > 3
  const showRightDots =
    pageCount < MIN_PAGES ? false : currentPage < pageCount - 2
  //
  if (!showLeftDots && showRightDots) items = generateItems(2, 5)
  if (showLeftDots && showRightDots)
    items = generateItems(currentPage - 1, currentPage + 1)
  if (showLeftDots && !showRightDots)
    items = generateItems(pageCount - 4, pageCount - 1)
  if (!showLeftDots && !showRightDots) items = generateItems(2, pageCount - 1)

  const next = () => {
    searchParams.set("page", currentPage - 1)
    setSearchParams(searchParams)
  }
  const prev = () => {
    searchParams.set("page", currentPage + 1)
    setSearchParams(searchParams)
  }
  const onClick = (page) => {
    searchParams.set("page", page)
    setSearchParams(searchParams)
  }

  return (
    <StyledPagination>
      <Button disabled={currentPage === 1} onClick={next}>
        <HiOutlineChevronLeft />
      </Button>
      <List>
        <Item
          active={currentPage === 1 ? "active" : null}
          key={1}
          onClick={() => onClick(1)}
        >
          1
        </Item>
        {showLeftDots && <Item>...</Item>}
        {items.map((item) => (
          <Item
            active={currentPage === item ? "active" : null}
            key={item}
            onClick={() => onClick(item)}
          >
            {item}
          </Item>
        ))}
        {showRightDots && <Item>...</Item>}
        <Item
          active={currentPage === pageCount ? "active" : null}
          key={pageCount}
          onClick={() => onClick(pageCount)}
        >
          {pageCount}
        </Item>
      </List>
      <Button disabled={currentPage === pageCount} onClick={prev}>
        <HiOutlineChevronRight />
      </Button>
    </StyledPagination>
  )
}

export default Pagination
