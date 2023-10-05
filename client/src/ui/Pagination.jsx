import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
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
  background: none;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-orange-400);
    color: #fff;
  }
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
const MAX_POSTS_ON_DASHBOARD = 2

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 0

  const totalPages = Math.ceil(count / MAX_POSTS_ON_DASHBOARD)

  const next = () => {
    searchParams.set('page', currentPage + 1)
    setSearchParams(searchParams)
  }
  const previous = () => {
    searchParams.set('page', currentPage - 1)
    setSearchParams(searchParams)
  }

  const from = 1
  const to = 10
  return (
    <StyledPagination>
      <P>
        Showing <span>{from}</span> to <span>{to}</span> of{' '}
        <span>{count} </span>
        results
      </P>
      <Buttons>
        <Button onClick={previous}>
          <HiChevronLeft />
          <span>Previous</span>
        </Button>
        <Button onClick={next}>
          <span>Next</span>
          <HiChevronRight />
        </Button>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination
