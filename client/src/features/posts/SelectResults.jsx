import styled, { css } from "styled-components"
import { HiMiniChevronDown } from "react-icons/hi2"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useOutsideClick } from "../../hooks/useOutsideClick"

const Button = styled.button`
  font-size: 1.5rem;
  display: block;
  color: var(--color-grey-500);
  padding: 1rem 0;
  border: none;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
  &:focus {
    outline: none;
  }
  span {
    color: var(--color-grey-500);
    font-weight: 500;
  }
  & svg {
    stroke-width: 2;
  }
`
const List = styled.ul`
  /* top: 8rem; */
  top: 7rem;
  right: 0;
  background-color: #fff;
  position: absolute;
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  padding: 2rem 1rem;
  /* padding: 1rem 3rem 1rem 1rem; */
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const ListItem = styled.li`
  cursor: pointer;
  color: var(--color-grey-500);
  /* padding: 1rem 1rem 1rem 1.5rem; */
  padding: 1rem 3rem;
  font-weight: 500;
  font-size: 1.5rem;
  border-radius: 10px;
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-orange-400);
      color: #fff;
    `}
  &:hover {
    color: #fff;
    background-color: var(--color-orange-300);
  }
`
function SelectResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showList, setShowList] = useState(false)
  const ref = useOutsideClick(() => setShowList(false))
  const currPath = location.pathname.slice("1")

  const onClick = (path) => {
    navigate(path)
    setShowList(false)
  }

  return (
    <div ref={ref}>
      <Button type="button" onClick={() => setShowList((show) => !show)}>
        <span style={{ textTransform: "capitalize" }}>{currPath}</span>
        <HiMiniChevronDown />
      </Button>
      {showList && (
        <List>
          <ListItem
            active={currPath === "users" ? "users" : null}
            key="Users"
            onClick={() => onClick("/users")}
          >
            Users
          </ListItem>
          <ListItem
            active={currPath === "posts" ? "posts" : null}
            key="Posts"
            onClick={() => onClick("/posts")}
          >
            Posts
          </ListItem>
        </List>
      )}
    </div>
  )
}

export default SelectResults
