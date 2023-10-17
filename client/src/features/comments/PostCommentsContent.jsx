import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Modal, { useModalContext } from '../../ui/Modal'
import PostComment from './PostComment'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import ConfirmDelete from '../../ui/ConfirmDelete'
import EditComment from './EditComment'
import { useDeleteComment } from './useDeleteComment'
import { useUpdateComment } from './useUpdateComment'
import { useUser } from '../auth/useUser'
import SpinnerMini from '../../ui/SpinnerMini'

const OptionsMenu = styled.menu`
  position: absolute;
  background-color: #fff;
  top: 3.5rem;
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
const Preview = styled.p`
  text-align: center;
`
const EndOfList = styled.p`
  text-align: center;
  color: var(--color-grey-500);
  font-size: 1.5rem;
`
const StyledSpinner = styled.div`
  justify-content: center;
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--color-orange-400);
  padding: 1rem 2.5rem;
  border: 2px solid transparent;
  span {
    font-size: 1.4rem;
    font-weight: 500;
  }
`

function PostCommentsContent({
  comments,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  commentsCount,
}) {
  const { user } = useUser()
  const { isDeleting, deleteComment } = useDeleteComment()
  const { isUpdating, updateComment } = useUpdateComment()
  const [currentComment, setCurrentComment] = useState(null)
  const menuRef = useOutsideClick(handler)
  const { currentOpenedWindow, closeWindow: closeModalWindow } =
    useModalContext()

  const lastCommentRef = useRef(null)

  const showWindow = ({ mode, comment }) => {
    setCurrentComment(comment)
  }
  function closeWindow() {
    setCurrentComment(null)
    closeModalWindow()
  }
  function handler() {
    if (currentOpenedWindow) return
    closeWindow()
  }
  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0 }
    const callBackFn = (entries) => {
      const [entry] = entries
      console.log(lastCommentRef.current)
      if (!entry.isIntersecting) return
      if (!isFetchingNextPage && hasNextPage) fetchNextPage()
    }
    const observer = new IntersectionObserver(callBackFn, options)
    if (lastCommentRef.current && hasNextPage)
      observer.observe(lastCommentRef.current)
    return () => observer.disconnect()
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, commentsCount])

  return (
    <>
      {comments?.map((commentObj, index) => (
        <PostComment
          ref={index === comments.length - 1 ? lastCommentRef : null}
          key={commentObj._id}
          commentObj={commentObj}
          belongsToUser={user?._id === commentObj.user._id}
          showMenu={(commentObj) =>
            setCurrentComment((currentComment) =>
              currentComment?._id === commentObj._id ? null : commentObj,
            )
          }
        >
          {currentComment?._id === commentObj._id && (
            <OptionsMenu ref={menuRef}>
              <OptionsList>
                <Modal.Open window={`onEdit--${currentComment?._id}`}>
                  <OptionsItem
                    onClick={() =>
                      showWindow({ comment: commentObj, mode: 'editing' })
                    }
                  >
                    <HiPencil />
                    <span>Edit</span>
                  </OptionsItem>
                </Modal.Open>
                <Modal.Open window={`onDelete--${currentComment?._id}`}>
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
      <Preview>
        {isFetchingNextPage ? (
          <StyledSpinner>
            <SpinnerMini />
            <span>Loading more...</span>
          </StyledSpinner>
        ) : null}
      </Preview>
      <Modal.Window
        onClose={closeWindow}
        window={`onDelete--${currentComment?._id}`}
      >
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
      <Modal.Window
        onClose={closeWindow}
        window={`onEdit--${currentComment?._id}`}
      >
        <EditComment
          commentObj={currentComment}
          disabled={isUpdating}
          onConfirm={({ comment, newComment }) =>
            updateComment({ comment, newComment }, { onSettled: closeWindow })
          }
        />
      </Modal.Window>
    </>
  )
}

export default PostCommentsContent
