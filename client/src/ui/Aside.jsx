import styled from "styled-components"
import {
  HiOutlineHandThumbUp,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBookmark,
  HiOutlineBookmarkSlash,
  HiOutlineShare,
  HiOutlineHeart
} from "react-icons/hi2"

const StyledAside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: var(--color-grey-50); */
  padding: 12rem 0 0 5rem;
  /* padding: 9rem 0 0 2rem; */
  /* margin: 9rem 0 0 5rem; */
  /* height: 100%; */
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-grey-500);
  & span:not(:first-child) {
    font-size: 1.4rem;
  }
`

const Icon = styled.span`
  & svg {
    stroke-width: 1.5;
    width: 2.75rem;
    height: 2.75rem;
  }
  cursor: pointer;
  /* color: var(--color-grey-400); */
  &:hover {
    color: var(--color-orange-400);
  }
  position: relative;
  /* background-color: var(--color-grey-50); */
  &:hover::after {
    content: attr(title);
    position: absolute;
    background-color: var(--color-orange-400);
    color: #fff;
    text-align: center;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    z-index: 100;
    font-size: 1.3rem;
    top: 0;
    right: -13rem;
    width: 12rem;
    box-shadow: var(--shadow-sm);
  }
`

function Aside() {
  return (
    <StyledAside>
      <List>
        <Item>
          <Icon title="Like this article">
            <HiOutlineHeart />
          </Icon>
          <span>12</span>
        </Item>
        <Item>
          <Icon title="Jump to comments">
            <HiOutlineChatBubbleOvalLeft />
          </Icon>
          <span>86</span>
        </Item>
        <Item>
          <Icon title="Add to bookmark">
            <HiOutlineBookmark />
          </Icon>
        </Item>
        <Item>
          <Icon title="Share this article">
            <HiOutlineShare />
          </Icon>
        </Item>
      </List>
    </StyledAside>
  )
}

export default Aside
