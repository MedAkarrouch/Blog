import styled from 'styled-components'
import PostComment from './PostComment'
import Heading from '../../ui/Heading'
import { useUser } from '../auth/useUser'
import { usePostComments } from './usePostComments'
import AddComment from './AddComment'
import PostCommentForLoggedInUser from './PostCommentForLoggedInUser'
import { forwardRef, useState } from 'react'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import EditComment from './EditComment'
import { useDeleteComment } from './useDeleteComment'
import { useUpdateComment } from './useUpdateComment'
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
const PostComments = forwardRef(function PostComments(_, ref) {
  const { user } = useUser()
  const { isFetching, isLoading, comments, totalComments } = usePostComments()
  const [currentComment, setCurrentComment] = useState(null)
  const [onMode, setOnMode] = useState(null)
  const { isDeleting, deleteComment } = useDeleteComment()
  const { isUpdating, updateComment } = useUpdateComment()

  const showWindow = ({ mode, comment }) => {
    setCurrentComment(comment)
    setOnMode(mode)
  }
  const closeWindow = () => {
    setCurrentComment(null)
    setOnMode(null)
  }

  console.log({ isFetching, isLoading, totalComments, comments })
  return (
    <Container ref={ref}>
      <StyledHeading as="h1">
        Comments
        <NumComments> ({totalComments})</NumComments>
      </StyledHeading>
      <AddComment user={user} />
      <Modal>
        {comments?.map((commentObj) =>
          user?._id === commentObj.user._id ? (
            <PostCommentForLoggedInUser
              key={commentObj._id}
              commentObj={commentObj}
              showWindow={showWindow}
            />
          ) : (
            <PostComment key={commentObj._id} commentObj={commentObj} />
          ),
        )}
        {onMode === 'deleting' && (
          <Modal.Window window={currentComment._id}>
            <ConfirmDelete
              resourceName={'comment'}
              disabled={isDeleting}
              onConfirm={() =>
                deleteComment(currentComment._id, { onSettled: closeWindow })
              }
            />
          </Modal.Window>
        )}
        {onMode === 'editing' && (
          <Modal.Window window={currentComment._id}>
            <EditComment
              commentObj={currentComment}
              disabled={isUpdating}
              onConfirm={({ comment, newComment }) =>
                updateComment(
                  { comment, newComment },
                  { onSettled: closeWindow },
                )
              }
            />
          </Modal.Window>
        )}
      </Modal>
    </Container>
  )
})

export default PostComments
