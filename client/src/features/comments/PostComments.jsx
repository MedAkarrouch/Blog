import styled from "styled-components"
import PostComment from "./PostComment"
import Heading from "../../ui/Heading"
import AddComment from "./AddComment"
import { useUser } from "../auth/useUser"
import PostCommentForLoggedInUser from "./PostCommentForLoggedInUser"
const Container = styled.div`
  padding-top: 3rem;
  border-top: 2px solid var(--color-grey-200);
`
const StyledHeading = styled(Heading)`
  margin-bottom: 3rem;
  font-size: 3.5rem;
  font-weight: 700;
`
const NumComments = styled.span`
  font-size: 3rem;
`

function PostComments({ post }) {
  const { comments } = post
  const { user } = useUser()
  const hasAlreadyCommented = comments?.comments?.some(
    (comment) => comment.user._id === user?._id
  )
  return (
    <Container>
      <StyledHeading as="h1">
        Comments
        <NumComments> ({comments?.totalComments})</NumComments>
      </StyledHeading>
      {!hasAlreadyCommented && <AddComment user={user} />}
      {comments?.comments
        ?.sort((a, b) => new Date(b.commentedAt) - new Date(a.commentedAt))
        .map((postComment) =>
          postComment.user._id === user?._id ? (
            <PostCommentForLoggedInUser
              key={postComment._id}
              postComment={postComment}
            />
          ) : (
            <PostComment key={postComment._id} postComment={postComment} />
          )
        )}
    </Container>
  )
}

export default PostComments
