import styled, { css } from 'styled-components'
import { HiMiniChevronRight, HiMiniChevronLeft } from 'react-icons/hi2'
import { categoriesArr } from '../utils/constants'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  gap: 2rem;
  /* justify-content: center; */
  /* overflow-x: hidden; */
  position: relative;
  overflow-x: hidden;

  & svg {
    cursor: pointer;
    z-index: 100;
    font-size: 2.75rem;
    stroke-width: 0.5;
    background: transparent;
    /* position: absolute; */
    /* top: 50%; */
    /* transform: translateY(-50%); */
    &:first-child {
      /* left: 0; */
    }
    &:last-child {
      /* right: 0; */
    }
  }
`

const List = styled.ul`
  display: flex;
  gap: 5rem;
  gap: 3rem;
  align-items: center;
  position: absolute;
  /* top: 0; */
  left: 0;
  right: 0;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(0, -50%);
  transition: transform 0.3s ease;
`
const Item = styled.li`
  white-space: nowrap;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  &:hover {
    color: var(--color-grey-500);
  }
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-orange-500);
      color: #fff;
      &:hover {
        color: #fff;
      }
    `}
`
const XX = styled.div`
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 4rem 0;
`

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategory = searchParams.get('category') || 'all'

  const next = () => {}
  const prev = () => {}
  const onClick = (category) => {
    searchParams.set('category', category)
    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      <HiMiniChevronLeft onClick={prev} />
      <XX>
        <List>
          {categoriesArr.map((category) => (
            <Item
              active={category.value === currentCategory}
              key={category.label}
              onClick={() => onClick(category.value)}
            >
              {category.label}
            </Item>
          ))}
        </List>
      </XX>
      <HiMiniChevronRight onClick={next} />
    </StyledFilter>
  )
}
// function Filter() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const listRef = useRef()
//   const scrollPercentage = useRef(0)
//   const currentCategory = searchParams.get('category') || 'all'
//   const next = () => {
//     const list = listRef.current
//     const scroll = list.scrollWidth - list.clientWidth
//     console.log(scroll, scrollPercentage.current)
//     if (scrollPercentage.current < 0) scrollPercentage.current = 0
//     if (scroll <= scrollPercentage.current) return
//     scrollPercentage.current = Number(
//       (scrollPercentage.current + scroll * 0.2).toFixed(1),
//     )
//     list.style.transform = `translate(-${scrollPercentage.current}px,-50%)`
//     console.log(scroll, scrollPercentage.current)
//   }
//   const prev = () => {
//     const list = listRef.current
//     const scroll = list.scrollWidth - list.clientWidth
//     if (scrollPercentage.current === 0) return
//     scrollPercentage.current = Number(
//       (scrollPercentage.current - scroll * 0.2).toFixed(1),
//     )
//     // scrollPercentage.current -= scroll * 0.2
//     list.style.transform = `translate(-${scrollPercentage.current}px,-50%)`
//     console.log(scroll, scrollPercentage.current)
//   }
//   const onClick = (category) => {
//     searchParams.set('category', category)
//     setSearchParams(searchParams)
//   }

//   return (
//     <StyledFilter>
//       <HiMiniChevronLeft onClick={prev} />
//       <XX>
//         <List ref={listRef}>
//           {categoriesArr.map((category) => (
//             <Item
//               active={category.value === currentCategory}
//               key={category.label}
//               onClick={() => onClick(category.value)}
//             >
//               {category.label}
//             </Item>
//           ))}
//         </List>
//       </XX>
//       <HiMiniChevronRight onClick={next} />
//     </StyledFilter>
//   )
// }

export default Filter
