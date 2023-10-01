import styled from 'styled-components'
import Heading from '../../ui/Heading'
import { useUser } from '../auth/useUser'
import { usePostComments } from './usePostComments'
import AddComment from './AddComment'
import PostComment from './PostComment'
import { forwardRef, useState } from 'react'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import EditComment from './EditComment'
import { useDeleteComment } from './useDeleteComment'
import { useUpdateComment } from './useUpdateComment'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useOutsideClick } from '../../hooks/useOutsideClick'
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
  const { isFetching, isLoading, comments, totalComments } = usePostComments()

  console.log({ isFetching, isLoading, totalComments, comments })

  return (
    <Container ref={ref}>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <StyledHeading as="h1">
            Comments
            <NumComments> ({totalComments})</NumComments>
          </StyledHeading>
          <AddComment user={user} />
          <PostCommentsContent user={user} comments={comments} />
        </>
      )}
    </Container>
  )
})

export default PostComments
