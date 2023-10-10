import { BiLoaderAlt } from 'react-icons/bi'
import styled, { css, keyframes } from 'styled-components'

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
  ${(props) =>
    props.publish &&
    css`
      margin: 0 1.5rem;
    `}
  ${(props) =>
    props.size &&
    css`
      width: ${props.size};
      height: ${props.size};
    `}
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`

export default SpinnerMini
