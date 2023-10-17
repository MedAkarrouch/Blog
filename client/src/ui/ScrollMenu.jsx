import styled, { css } from 'styled-components'
import { categoriesArr } from '../utils/constants'
import { useEffect, useRef, useState } from 'react'
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import { useWindowListener } from '../hooks/useWindowListener'

const StyledSlider = styled.div`
  padding: 0;
  /* border-radius: 13px; */
  position: relative;
  /* overflow: hidden; */
  & span:first-child {
    left: -1rem;
    background: linear-gradient(to left, transparent 0%, #fff 20%);
  }
  & span:last-child {
    right: -1rem;
    background: linear-gradient(to right, transparent 0%, #fff 20%);
  }
`
const Item = styled.div`
  cursor: pointer;
  white-space: nowrap;
  font-size: 1.4rem;
  border-radius: 30px;
  border-radius: 10px;
  font-weight: 500;
  background-color: var(--color-grey-50);
  padding: 1.3rem 2rem;
  padding: 0.8rem 1.6rem;
  ${(props) =>
    props.active &&
    css`
      color: #fff;
      background-color: var(--color-orange-400);
    `}
`
const ItemsContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
  scroll-behavior: smooth;
  position: relative;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`
const Icon = styled.span`
  z-index: 100;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 100%;
  &:hover,
  &:focus {
    & svg {
      color: var(--color-grey-900);
    }
  }
  & svg {
    color: var(--color-grey-500);
    cursor: pointer;
    z-index: 100;
    line-height: 0;
    font-size: 2.75rem;
    stroke-width: 0.5;
  }
`
const Container = styled.div`
  overflow: hidden;
`

function ScrollMenu({ filedName }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFieldVal = searchParams.get(filedName) || 'all'
  const containerRef = useRef(null)
  const itemRef = useRef(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(true)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [scrollBy, setScrollBy] = useState(window.innerWidth < 500 ? 150 : 340)

  const onClick = (item) => {
    searchParams.set(filedName, item)
    setSearchParams(searchParams)
  }
  const next = () => {
    containerRef.current.scrollLeft += scrollBy
    setScrollLeft((prev) => prev + scrollBy)
  }
  const prev = () => {
    containerRef.current.scrollLeft -= scrollBy
    setScrollLeft((prev) => prev - scrollBy)
  }
  // change the scrollBy based on the window's size
  const handleScrollBy = () => {
    if (window.innerWidth < 500) setScrollBy(150)
    else setScrollBy(340)
  }
  useWindowListener(handleScrollBy)
  // scroll to the selected element from the url
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        console.log(entry.isIntersecting)
        const containerRect = containerRef?.current?.getBoundingClientRect()
        const itemRect = itemRef?.current?.getBoundingClientRect()
        const left = itemRect?.left - containerRect?.left
        setScrollLeft((prev) => prev + left - 150)
        containerRef.current.scrollLeft += left - 150
        observer.disconnect()
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )
    if (itemRef.current) observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [])
  // when to show left arrow
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        console.log(entry.isIntersecting)
        if (entry.isIntersecting) setShowLeftArrow(false)
        else setShowLeftArrow(true)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )
    if (containerRef.current) observer.observe(containerRef.current.firstChild)
    return () => observer.disconnect()
  }, [scrollLeft])
  // when to show right arrow
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        console.log(entry.isIntersecting, 'last-child')
        if (entry.isIntersecting) setShowRightArrow(false)
        else setShowRightArrow(true)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )
    if (containerRef.current) observer.observe(containerRef.current.lastChild)
    return () => observer.disconnect()
  }, [scrollLeft])

  return (
    <Container>
      <StyledSlider
        show-left-blur={showLeftArrow}
        show-right-blur={showRightArrow}
      >
        {showLeftArrow && (
          <Icon title="Previous">
            <HiMiniChevronLeft onClick={prev} />
          </Icon>
        )}
        <ItemsContainer ref={containerRef}>
          {categoriesArr.map((item) => (
            <Item
              key={item.value}
              onClick={() => onClick(item.value)}
              active={currentFieldVal === item.value ? 'true' : null}
              ref={currentFieldVal === item.value ? itemRef : null}
            >
              {item.label}
            </Item>
          ))}
        </ItemsContainer>
        {showRightArrow && (
          <Icon title="Next">
            <HiMiniChevronRight onClick={next} />
          </Icon>
        )}
      </StyledSlider>
    </Container>
  )
}

export default ScrollMenu
