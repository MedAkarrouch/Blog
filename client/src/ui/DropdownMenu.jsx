import styled from "styled-components"
import { useOutsideClick } from "../hooks/useOutsideClick"
import { categories } from "../utils/constants"

const StyledContainer = styled.div`
  position: relative;
  max-width: 18rem;
`
const Input = styled.input`
  display: block;
  width: 100%;
  cursor: pointer;
  /*  */
  background-color: #fff;
  border: 3px solid var(--color-grey-100);
  /* padding: 0.75rem 1.25rem; */
  padding: 0 1.25rem;
  height: 4.3rem;

  font-weight: 500;
  font-size: 1.5rem;
  border-radius: 5px;
  &::placeholder {
    color: var(--color-grey-700);
    /* color: #fff; */
  }
  &:hover {
    color: #fff;
    background-color: var(--color-orange-400);
    border: 3px solid var(--color-orange-400);
    &::placeholder {
      color: #fff;
    }
  }
  &:focus {
    box-shadow: var(--shadow);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background-color: var(--color-orange-400);
    color: #fff;
    border: 3px solid var(--color-orange-400);
    outline: none;
    &::placeholder {
      color: #fff;
    }
  }
`
const List = styled.ul`
  position: absolute;
  bottom: -37rem;
  left: 0;
  /* background-color: var(--color-grey-100); */
  background-color: #fff;
  width: 100%;
  z-index: 1000;
  box-shadow: var(--shadow);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
`
const ListItem = styled.li`
  color: var(--color-grey-600);
  cursor: pointer;
  padding: 1rem 1rem 1rem 1.5rem;
  font-weight: 500;
  font-size: 1.4rem;
  &:hover {
    color: #fff;
    background-color: var(--color-orange-400);
  }
`

function DropdownMenu({ showList, setShowList, category, setCategory }) {
  // const [showList, setShowList] = useState(false)
  // const [categorie, setCategorie] = useState("")
  const closeList = () => setShowList(false)
  const openList = () => setShowList(true)
  const ref = useOutsideClick(closeList)

  const filteredCategories =
    category === ""
      ? categories
      : categories.filter((el) =>
          el.toLowerCase().startsWith(category.toLowerCase())
        )

  return (
    <StyledContainer>
      <Input
        ref={ref}
        placeholder="Select category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onFocus={() => {
          setCategory("")
          openList()
        }}
      />
      {showList && (
        <List>
          {filteredCategories.map((el) => (
            <ListItem onClick={() => setCategory(el)} key={el}>
              {el}
            </ListItem>
          ))}
        </List>
      )}
    </StyledContainer>
  )
}

export default DropdownMenu
