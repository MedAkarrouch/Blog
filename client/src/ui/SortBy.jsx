import styled, { css } from 'styled-components'
import { HiChevronUp, HiChevronDown, HiOutlineCheck } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Container = styled.div`
  position: relative;
`

const Button = styled.button`
  background: none;
  text-transform: capitalize;
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  padding: 1.25rem 2rem;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  gap: 2rem;
  & svg {
    stroke-width: 1.5;
    font-size: 1.25rem;
  }
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 6rem;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  padding: 1rem;
  gap: 0.5rem;
  border: 1px solid var(--color-grey-100);
  border-radius: 13px;
  width: 20rem;
  box-shadow: var(--shadow-md);
`
const ListButton = styled.button`
  display: flex;
  text-transform: capitalize;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  font-size: 1.3rem;
  font-weight: 500;
  background: ${(props) => (props.active ? 'var(--color-grey-100)' : '#FFF')};
  border-radius: 7px;
  & svg {
    stroke-width: 3;
    opacity: ${(props) => (props.active ? 1 : 0)};
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`

function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams()
  let sortBy = searchParams.get('sortBy')
  sortBy = ['latest', 'popular'].includes(sortBy) ? sortBy : 'latest'
  const [showList, setShowList] = useState(false)
  const ref = useOutsideClick(() => setShowList(false))

  const onClick = (val) => {
    searchParams.set('sortBy', val)
    setSearchParams(searchParams)
    setShowList(false)
  }
  return (
    <Container>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          setShowList((show) => !show)
        }}
      >
        <span>{sortBy}</span>
        {showList ? <HiChevronUp /> : <HiChevronDown />}
      </Button>
      {showList && (
        <List ref={ref}>
          <ListButton
            onClick={() => onClick('latest')}
            active={sortBy === 'latest' ? 'true' : ''}
          >
            <span>latest</span>
            <HiOutlineCheck />
          </ListButton>
          <ListButton
            onClick={() => onClick('popular')}
            active={sortBy === 'popular' ? 'true' : ''}
          >
            <span>popular</span>
            <HiOutlineCheck />
          </ListButton>
        </List>
      )}
    </Container>
  )
}

export default SortBy
