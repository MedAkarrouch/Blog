import styled, { css } from 'styled-components'
import { categoriesArr } from '../utils/constants'
import { useEffect, useRef, useState } from 'react'
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'

const StyledSlider = styled.div`
  /* background-color: var(--color-orange-50); */
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  align-items: center;
  max-width: 90rem;
  margin: 10rem auto;
  gap: 0 2rem;
`
const Items = styled.div`
  /* background-color: var(--color-grey-500); */
  display: grid;
  grid-template-columns: 4fr 8fr 7fr 15fr 16fr 16fr 11fr 8fr 10fr 6fr;
  align-items: center;
  column-gap: 2rem;
  transform: translateX(${(props) => props['translate-x']}rem);
  width: 130rem;
  transition: transform 0.3s ease;
`
const Item = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  padding: 0.25rem 0rem;
  ${(props) =>
    props.active &&
    css`
      border-color: var(--color-orange-400);
    `}
  font-size: 1.5rem;
  font-weight: 500;
  ${(props) =>
    !props.active &&
    css`
      transition: color 0.3s ease;
      &:hover {
        color: var(--color-grey-950);
      }
    `}
`
const ItemsContainer = styled.div`
  overflow-x: scroll;
  position: relative;
  cursor: grab;
  &::-webkit-scrollbar {
    /* display: none; */
  }
`
const Icon = styled.span`
  /* background-color: green; */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 4rem;
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    color: var(--color-grey-500);
    cursor: pointer;
    z-index: 100;
    font-size: 2.75rem;
    stroke-width: 0.5;
    background: transparent;
  }
`
function Slider({ filedName }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFieldVal = searchParams.get(filedName) || 'all'
  const [translateX, setTranslateX] = useState('0')
  const itemRef = useRef(null)
  const containerRef = useRef(null)

  const onClick = (item) => {
    searchParams.set(filedName, item)
    setSearchParams(searchParams)
  }
  const next = (value = null) => {
    setTranslateX((val) => value || val - 20)
  }
  const prev = (value = null) => {
    setTranslateX((val) => value || val + 20)
  }
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        // console.log(entry.isIntersecting)
        // setTranslateX((leftPosition - 130) / 2)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )
    if (itemRef.current) observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [currentFieldVal])

  return (
    <StyledSlider>
      <Icon>
        <HiMiniChevronLeft onClick={() => prev()} />
      </Icon>
      {/* <button onClick={prev}>Prev</button> */}
      <ItemsContainer>
        <Items ref={containerRef} translate-x={translateX}>
          {categoriesArr.map((item, index) => (
            <Item
              key={item.value}
              onClick={() => onClick(item.value)}
              active={currentFieldVal === item.value ? 'true' : null}
              ref={currentFieldVal === item.value ? itemRef : null}
            >
              {item.label}
            </Item>
          ))}
        </Items>
      </ItemsContainer>
      <Icon>
        <HiMiniChevronRight onClick={() => next()} />
      </Icon>
      {/* <button onClick={next}>Next</button> */}
    </StyledSlider>
  )
}

export default Slider
