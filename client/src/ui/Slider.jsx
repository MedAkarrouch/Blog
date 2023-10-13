import styled from 'styled-components'
import { categoriesArr } from '../utils/constants'
import { useRef, useState } from 'react'
const StyledSlider = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  align-items: center;
  max-width: 70rem;
  margin: 0 auto;
  gap: 0 2rem;
`
const Items = styled.div`
  background-color: var(--color-grey-500);
  display: grid;
  grid-template-columns: repeat(${categoriesArr.length}, 10rem);
  column-gap: 2rem;
  /* justify-items: cente; */
  position: absolute;
  top: 50%;
  transform: translate(${(props) => props['translate-x']}rem, -50%);
  width: 100%;
  transition: transform 0.3s ease;
`
const Item = styled.div`
  /* display: flex; */
  /* text-align: center; */
  /* align-items: center; */
  /* justify-content: center; */
  background-color: bisque;
`
const ItemsContainer = styled.div`
  overflow: hidden;
  min-height: 10rem;
  position: relative;
`
function Slider() {
  const [translateX, setTranslateX] = useState('0')
  const next = () => {
    setTranslateX((val) => val - 30)
  }
  const prev = () => {
    setTranslateX((val) => val + 30)
  }
  // const arr = [1, 2, 3]
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]

  return (
    <StyledSlider>
      <button onClick={prev}>Prev</button>
      <ItemsContainer>
        <Items translatex={translateX}>
          {categoriesArr.map((item) => (
            <Item key={item.value}>{item.label}</Item>
          ))}
        </Items>
      </ItemsContainer>
      <button onClick={next}>Next</button>
    </StyledSlider>
  )
}

export default Slider
