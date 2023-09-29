import styled from 'styled-components'
import PostLayout from '../posts/PostLayout'
import { usersImagesUrl } from '../../utils/constants'
import { DateTime } from 'luxon'
import { useTextExpander } from '../../hooks/useTextExpander'
import Button from '../account/Button'
import { forwardRef } from 'react'

const StyledRow = styled(PostLayout.Row)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const PostComment = forwardRef(function PostComment({ commentObj }, ref) {
  const { comment, createdAt, user } = commentObj
  const { text: commentText, show, isHidden } = useTextExpander(comment)
  return (
    <PostLayout ref={ref}>
      <PostLayout.UserImg alt="" src={`${usersImagesUrl}/${user.photo}`} />
      <PostLayout.Content>
        <StyledRow>
          <PostLayout.UserName>{user.fullName}</PostLayout.UserName>
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
        {DateTime.fromISO(createdAt).toRelative()}
      </PostLayout.PostDate>
    </PostLayout>
  )
})

export default PostComment
