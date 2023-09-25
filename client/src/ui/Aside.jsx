import styled, { css } from "styled-components"
import { useUser } from "../features/auth/useUser"
import {
  HiOutlineHandThumbUp,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBookmark,
  HiOutlineBookmarkSlash,
  HiOutlineShare,
  HiOutlineHeart
} from "react-icons/hi2"
import { useLikePost } from "../features/posts/useLikePost"
import { useState } from "react"

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
  cursor: pointer;
  & svg {
    stroke-width: 1.5;
    width: 2.75rem;
    height: 2.75rem;
  }
  ${(props) =>
    props.active &&
    css`
      & svg {
        fill: var(--color-orange-400);
        color: var(--color-orange-400);
      }
    `}
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

function Aside({ post }) {
  const { user } = useUser()
  const { likes, comments } = post
  const { isLoading, likePost } = useLikePost()
  const [hasUserAlreadyLikedPost, setHasUserAlreadyLikedPost] = useState(() =>
    likes?.likes?.some((like) => like.user === user._id)
  )
  const [totalLikes, setTotalLikes] = useState(likes?.totalLikes || 0)

  const handleLikeClick = () => {
    setTotalLikes((likes) => (hasUserAlreadyLikedPost ? likes - 1 : likes + 1))
    setHasUserAlreadyLikedPost((like) => !like)
    likePost(null, {
      onError: () => {
        setHasUserAlreadyLikedPost(hasUserAlreadyLikedPost)
        setTotalLikes(totalLikes)
      }
    })
  }
  return (
    <StyledAside>
      <List>
        <Item>
          <Icon
            title={
              hasUserAlreadyLikedPost ? "Remove like" : "Like this article"
            }
            active={hasUserAlreadyLikedPost ? "true" : ""}
            onClick={handleLikeClick}
          >
            <HiOutlineHeart />
          </Icon>
          <span>{totalLikes}</span>
        </Item>
        <Item>
          <Icon title="Jump to comments">
            <HiOutlineChatBubbleOvalLeft />
          </Icon>
          <span>{comments.totalComments}</span>
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
