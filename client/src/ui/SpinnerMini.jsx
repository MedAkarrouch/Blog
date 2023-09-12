import { BiLoaderAlt } from "react-icons/bi"
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg); /* Rotate 360 degrees (one full circle) */
  }
`

const SpinnerMini = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`

export default SpinnerMini
