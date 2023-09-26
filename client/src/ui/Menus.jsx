import { Children, createContext, useState } from "react"
import styled from "styled-components"
const MenusContext = createContext()
function Menus({ chilren }) {
  const [openId, setOpenId] = useState("")
  const close = () => setOpenId("")
  const open = (id) => setOpenId(id)
  return (
    <MenusContext.Provider value={{ openId, open, close }}>
      {Children}
    </MenusContext.Provider>
  )
}
function Toggle() {}
function Button() {}
function List() {}

Menus.Toggle = Toggle
Menus.Button = Button
Menus.List = List
export default Menus
