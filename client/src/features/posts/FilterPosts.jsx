import styled from "styled-components"
import { categories } from "../../utils/constants"
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi2"

const StyledFilterBar = styled.div`
  display: flex;
  align-items: center;
`

const List = styled.ul`
  display: flex;
  gap: 1rem;
  overflow-y: hidden;
  padding: 0 2rem;
`
const Category = styled.li`
  font-weight: 500;
`
const ArrowLeft = styled(HiOutlineChevronLeft)`
  cursor: pointer;
  font-size: 2rem;
`
const ArrowRight = styled(HiOutlineChevronRight)`
  cursor: pointer;
  font-size: 2rem;
`

function FilterPosts() {
  return (
    <div>
      <StyledFilterBar>
        <ArrowLeft />
        <List>
          {categories.map((cat) => (
            <Category>{cat}</Category>
          ))}
        </List>
        <ArrowRight />
      </StyledFilterBar>
    </div>
  )
}

export default FilterPosts
