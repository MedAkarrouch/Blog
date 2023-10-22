import styled from 'styled-components'
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2'
import { differenceInSeconds } from 'date-fns'
import PostLayout from '../posts/PostLayout'
import { usersImagesUrl } from '../../utils/constants'
import { DateTime } from 'luxon'
import { forwardRef } from 'react'
import Button from '../account/Button'
import { useTextExpander } from '../../hooks/useTextExpander'

const StyledRow = styled(PostLayout.Row)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
const StyledOptionsBtn = styled.button`
  background: transparent;
  border: none;
  display: flex;
  padding: 0.25rem;
  border-radius: 5px;
  & svg {
    height: 2.5rem;
    width: 2.5rem;
    stroke-width: 2;
    cursor: pointer;
    color: var(--color-grey-500);
    line-height: 0;
    &:hover {
      color: var(--color-grey-700);
    }
  }
`
const PostComment = forwardRef(function PostComment(
  { commentObj, children, showMenu, belongsToUser },
  ref,
) {
  const { comment, createdAt, user } = commentObj
  const { text: commentText, show, isHidden } = useTextExpander(comment)

  return (
    <PostLayout ref={ref}>
      <PostLayout.UserImg
        loading="lazy"
        alt=""
        src={`${usersImagesUrl}/${user.photo}`}
      />
      <PostLayout.Content>
        <StyledRow>
          <PostLayout.UserName>{user.username}</PostLayout.UserName>
          {belongsToUser && (
            <>
              <StyledOptionsBtn
                onClick={(e) => {
                  e.stopPropagation()
                  showMenu(commentObj)
                }}
              >
                <HiOutlineEllipsisHorizontal />
              </StyledOptionsBtn>
              {children}
            </>
          )}
        </StyledRow>
        <PostLayout.Comment>
          {commentText}
          {isHidden && (
            <Button variation="showMore" onClick={show}>
              See more
            </Button>
          )}
        </PostLayout.Comment>
      </PostLayout.Content>
      <PostLayout.PostDate>
        {differenceInSeconds(new Date(), new Date(createdAt)) <= 1
          ? 'Now'
          : DateTime.fromISO(createdAt).toRelative()}
        {/* {DateTime.fromISO(createdAt).toRelative()} */}
      </PostLayout.PostDate>
    </PostLayout>
  )
})

export default PostComment
