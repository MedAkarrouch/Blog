import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { MAX_POSTS_ON_DASHBOARD } from '../utils/constants'
import { useEffect, useRef } from 'react'
const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.6rem;
`
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.6rem 1.2rem;
  font: inherit;
  background-color: transparent;
  color: inherit;
  border: none;
  border-radius: 5px;
  &:hover:not(:disabled) {
    background-color: var(--color-orange-400);
    color: #fff;
  }
  ${(props) =>
    props.hovered &&
    css`
      background-color: var(--color-orange-400);
      color: #fff;
    `}
  & span {
    font-weight: 500;
  }
  & svg {
    font-size: 1.5rem;
    stroke-width: 1.5;
    /* width: 1.8rem; */
    /* height: 1.8rem; */
  }
`
const Buttons = styled.div`
  display: flex;
  gap: 2rem;
`
const P = styled.p`
  & span {
    font-weight: 600;
  }
`

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const totalPages = Math.ceil(count / MAX_POSTS_ON_DASHBOARD)
  const from = (currentPage - 1) * MAX_POSTS_ON_DASHBOARD + 1
  const to =
    currentPage === totalPages ? count : currentPage * MAX_POSTS_ON_DASHBOARD

  // currentPage > totalPages
  if (count <= MAX_POSTS_ON_DASHBOARD || currentPage < 0) return null

  const next = () => {
    searchParams.set('page', currentPage + 1)
    setSearchParams(searchParams)
  }
  const previous = () => {
    searchParams.set('page', currentPage - 1)
    setSearchParams(searchParams)
  }

  return (
    <StyledPagination>
      {from > count || to > count ? (
        <P>
          Page <span>{currentPage}</span> has <span>0</span> results
        </P>
      ) : (
        <P>
          Showing <span>{from}</span> to <span>{to}</span> of{' '}
          <span>{count} </span>
          results
        </P>
      )}
      <Buttons>
        <Button
          hovered={from > count || to > count ? 'true' : ''}
          disabled={from === 1}
          onClick={previous}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </Button>
        <Button disabled={to >= count} onClick={next}>
          <span>Next</span>
          <HiChevronRight />
        </Button>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination
