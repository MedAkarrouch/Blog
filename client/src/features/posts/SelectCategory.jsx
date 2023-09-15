import styled from "styled-components"
import { HiMiniChevronDown } from "react-icons/hi2"
import { useState } from "react"

const Button = styled.button`
  display: block;
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
  top: 8rem;
  right: 0;
  background-color: #fff;
  position: absolute;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  padding: 1rem;
  border-radius: 20px;
`
const ListItem = styled.li`
  cursor: pointer;
  color: var(--color-grey-500);
  padding: 1rem 1rem 1rem 1.5rem;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: 10px;
  &:hover {
    color: #fff;
    background-color: var(--color-orange-400);
  }
`

function SelectCategory({ items, category, setCategory, handler }) {
  // const [category, setCategory] = useState(categories.at(0))
  const [showList, setShowList] = useState(false)
  return (
    <div>
      <Button type="button" onClick={() => setShowList((show) => !show)}>
        <span>{category}</span>
        <HiMiniChevronDown />
      </Button>
      {showList && (
        <List>
          {items.map((cat) => (
            <ListItem
              key={cat}
              onClick={() => {
                setCategory(cat)
                setShowList(false)
                handler()
              }}
            >
              {cat}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default SelectCategory
