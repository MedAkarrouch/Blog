import styled from "styled-components"
import { createPortal } from "react-dom"

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  z-index: 10000;
  transition: all 0.5s;
  overflow: hidden;
`
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: var(--color-grey-50); */
  background-color: #fff;
  border-radius: 5px;
  /* box-shadow: var(--shadow-lg); */
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Content = styled.div``

function Modal({ children }) {
  return createPortal(
    <Overlay>
      <StyledModal>{children}</StyledModal>
    </Overlay>,
    document.body
  )
}

export default Modal
