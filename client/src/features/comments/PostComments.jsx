import styled from 'styled-components'
import PostComment from './PostComment'
import Heading from '../../ui/Heading'
import { useUser } from '../auth/useUser'
import { usePostComments } from './usePostComments'
import AddComment from './AddComment'
import PostCommentForLoggedInUser from './PostCommentForLoggedInUser'
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
function PostComments() {
  const { user } = useUser()
  const { isFetching, isLoading, comments, totalComments } = usePostComments()
  console.log({ isFetching, isLoading, totalComments, comments })
  return (
    <Container>
      <StyledHeading as="h1">
        Comments
        <NumComments> ({totalComments})</NumComments>
      </StyledHeading>
      <AddComment user={user} />
      {comments?.map((commentObj) =>
        user?._id === commentObj.user._id ? (
          <PostCommentForLoggedInUser
            key={commentObj._id}
            commentObj={commentObj}
          />
        ) : (
          <PostComment key={commentObj._id} commentObj={commentObj} />
        ),
      )}
    </Container>
  )
}

export default PostComments
