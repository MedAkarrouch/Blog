import styled from 'styled-components'
import Heading from '../../ui/Heading'
import { useUser } from '../auth/useUser'
import { usePostComments } from './usePostComments'
import AddComment from './AddComment'
import { forwardRef } from 'react'
import Modal from '../../ui/Modal'
import Spinner from '../../ui/Spinner'
import PostCommentsContent from './PostCommentsContent'

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
const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const PostComments = forwardRef(function PostComments(_, ref) {
  const { user } = useUser()
  const {
    isError,
    isFetchingNextPage,
    isLoading,
    comments,
    totalComments,
    fetchNextPage,
    hasNextPage,
  } = usePostComments()

  // console.log({ comments, isLoading, totalComments, comments })

  return (
    <Container ref={ref}>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner size={'5rem'} />
        </SpinnerWrapper>
      ) : isError ? (
        <span>Something went wrong, try again later</span>
      ) : (
        <>
          <StyledHeading as="h1">
            Comments
            <NumComments> ({totalComments})</NumComments>
          </StyledHeading>
          <AddComment user={user} />
          <Modal>
            <PostCommentsContent
              user={user}
              comments={comments}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </Modal>
        </>
      )}
    </Container>
  )
})

export default PostComments
