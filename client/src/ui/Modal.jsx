import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { cloneElement, createContext, useContext, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(4px) brightness(0.9); */
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
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`
const Button = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 1.2rem;
  top: 1.9rem;
  padding: 0.4rem;
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
    fill: var(--color-grey-500);
    stroke: var(--color-grey-500);
  }
`

const ModalContext = createContext()

function Modal({ children }) {
  const [currentOpenedWindow, setCurrentOpenedWindow] = useState('')
  const openWindow = (window) => setCurrentOpenedWindow(window)
  const closeWindow = () => setCurrentOpenedWindow('')

  return (
    <ModalContext.Provider
      value={{ currentOpenedWindow, openWindow, closeWindow }}
    >
      {children}
    </ModalContext.Provider>
  )
}

function Window({ children, window }) {
  const { currentOpenedWindow, closeWindow } = useContext(ModalContext)
  const ref = useOutsideClick(closeWindow, true)
  if (window !== currentOpenedWindow) return null
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={closeWindow}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: closeWindow })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  )
}

function Open({ window, children }) {
  const { openWindow } = useContext(ModalContext)
  return cloneElement(children, {
    // onFocus: (e) => {
    //   console.log("Focus")
    //   openWindow(window)
    // }
    onClick: (e) => {
      console.log('Click open window')
      if (children.props.onClick) children.props.onClick()
      openWindow(window)
    },
  })
}

Modal.Open = Open
Modal.Window = Window

export default Modal
