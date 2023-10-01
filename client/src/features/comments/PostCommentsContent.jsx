import { useState } from 'react'
import styled from 'styled-components'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Modal from '../../ui/Modal'
import PostComment from './PostComment'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import ConfirmDelete from '../../ui/ConfirmDelete'
import EditComment from './EditComment'
import { useDeleteComment } from './useDeleteComment'
import { useUpdateComment } from './useUpdateComment'

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

function PostCommentsContent({ user, comments }) {
  const { isDeleting, deleteComment } = useDeleteComment()
  const { isUpdating, updateComment } = useUpdateComment()
  const [currentComment, setCurrentComment] = useState(null)
  const [onMode, setOnMode] = useState(null)
  const menuRef = useOutsideClick(closeWindow)

  const showWindow = ({ mode, comment }) => {
    setCurrentComment(comment)
    setOnMode(mode)
  }
  function closeWindow() {
    console.log('handler')
    setCurrentComment(null)
    setOnMode(null)
  }
  return (
    <Modal>
      {comments?.map((commentObj) => (
        <PostComment
          key={commentObj._id}
          commentObj={commentObj}
          belongsToUser={user?._id === commentObj.user._id}
          // showMenu={(commentObj) => setCurrentComment(commentObj)}
          showMenu={(commentObj) => {
            console.log('OnClick')
            setCurrentComment((currentComment) =>
              currentComment?._id === commentObj._id ? null : commentObj,
            )
          }}
        >
          {currentComment?._id === commentObj._id && (
            <OptionsMenu ref={menuRef}>
              <OptionsList>
                <Modal.Open window={currentComment._id}>
                  <OptionsItem
                    onClick={() =>
                      showWindow({ comment: commentObj, mode: 'editing' })
                    }
                  >
                    <HiPencil />
                    <span>Edit</span>
                  </OptionsItem>
                </Modal.Open>
                <Modal.Open window={currentComment._id}>
                  <OptionsItem
                    onClick={() =>
                      showWindow({
                        comment: commentObj,
                        mode: 'deleting',
                      })
                    }
                  >
                    <HiTrash />
                    <span>Delete</span>
                  </OptionsItem>
                </Modal.Open>
              </OptionsList>
            </OptionsMenu>
          )}
        </PostComment>
      ))}
      {onMode === 'deleting' && currentComment && (
        <Modal.Window window={currentComment?._id}>
          <ConfirmDelete
            resourceName={'comment'}
            disabled={isDeleting}
            onConfirm={() =>
              deleteComment(currentComment._id, {
                onSettled: closeWindow,
              })
            }
          />
        </Modal.Window>
      )}
      {onMode === 'editing' && currentComment && (
        <Modal.Window window={currentComment?._id}>
          <EditComment
            commentObj={currentComment}
            disabled={isUpdating}
            onConfirm={({ comment, newComment }) =>
              updateComment({ comment, newComment }, { onSettled: closeWindow })
            }
          />
        </Modal.Window>
      )}
    </Modal>
  )
}

export default PostCommentsContent
