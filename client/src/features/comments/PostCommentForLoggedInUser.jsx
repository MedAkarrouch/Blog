import styled, { css } from 'styled-components'
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2'
import PostLayout from '../posts/PostLayout'
import { usersImagesUrl } from '../../utils/constants'
import { DateTime } from 'luxon'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import { forwardRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useDeleteComment } from './useDeleteComment'
import EditComment from './EditComment'
import { useUpdateComment } from './useUpdateComment'
import Button from '../account/Button'
import { useTextExpander } from '../../hooks/useTextExpander'

const StyledRow = styled(PostLayout.Row)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
const StyledOptionsBtn = styled.span`
  display: flex;
  & svg {
    width: 2.5rem;
    height: 2.5rem;
    stroke-width: 2;
    cursor: pointer;
    color: var(--color-grey-500);
    line-height: 0;
  }
`
const OptionsMenu = styled.menu`
  position: absolute;
  background-color: #fff;
  top: 3rem;
  right: 0;
  border-radius: 7px;
  box-shadow: var(--shadow-md);
`
const OptionsList = styled.ul`
  display: flex;
  flex-direction: column;
`
const OptionsItem = styled.li`
  cursor: pointer;
  padding: 1.2rem 2.4rem;
  display: flex;
  gap: 1.6rem;
  align-items: center;
  color: var(--color-grey-700);
  span {
    font-size: 1.4rem;
  }
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    color: var(--color-grey-400);
    width: 1.5rem;
    height: 1.5rem;
  }
`

const PostCommentForLoggedInUser = forwardRef(
  function PostCommentForLoggedInUser({ commentObj }, ref) {
    const { comment, commentedAt, user } = commentObj
    const [showList, setShowList] = useState(false)
    const refOptionsBtn = useOutsideClick(() => setShowList(false))
    const { isDeleting, deleteComment } = useDeleteComment()
    const [showModal, setShowModal] = useState(true)
    const { text: commentText, show, isHidden } = useTextExpander(comment)

    return (
      <PostLayout ref={ref}>
        <PostLayout.UserImg alt="" src={`${usersImagesUrl}/${user.photo}`} />
        <PostLayout.Content>
          <StyledRow>
            <PostLayout.UserName>{user.fullName}</PostLayout.UserName>
            <StyledOptionsBtn
              ref={refOptionsBtn}
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
                setShowList((show) => !show)
              }}
            >
              <HiOutlineEllipsisHorizontal />
            </StyledOptionsBtn>
            {showModal && (
              <Modal>
                {showList && (
                  <OptionsMenu>
                    <OptionsList>
                      <Modal.Open window="edit-comment">
                        <OptionsItem>
                          <HiPencil />
                          <span>Edit</span>
                        </OptionsItem>
                      </Modal.Open>
                      <Modal.Open window="delete-comment">
                        <OptionsItem>
                          <HiTrash />
                          <span>Delete</span>
                        </OptionsItem>
                      </Modal.Open>
                    </OptionsList>
                  </OptionsMenu>
                )}
                <Modal.Window window="delete-comment">
                  <ConfirmDelete
                    resourceName={'comment'}
                    disabled={isDeleting}
                    onConfirm={() =>
                      deleteComment(null, {
                        onError: () => setShowModal(false),
                      })
                    }
                  />
                </Modal.Window>
                <Modal.Window window="edit-comment">
                  <EditComment
                    onCloseModal={() => setShowModal(false)}
                    comment={comment}
                  />
                </Modal.Window>
              </Modal>
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
          {DateTime.fromISO(commentedAt).toRelative()}
        </PostLayout.PostDate>
      </PostLayout>
    )
  },
)

export default PostCommentForLoggedInUser
