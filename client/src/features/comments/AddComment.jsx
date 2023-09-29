import styled, { css } from 'styled-components'
import { useRef, useState } from 'react'
import { useAutoTextareaResize } from '../../hooks/useAutoTextareaResize'
import Button from '../account/Button'
import PostLayout from '../posts/PostLayout'
import {
  DEFAULT_IMG,
  MAX_COMMENT_LENGTH,
  usersImagesUrl,
} from '../../utils/constants'
import SpinnerMini from '../../ui/SpinnerMini'
import { toast } from 'react-hot-toast'
import Modal from '../../ui/Modal'
import LogInToContinue from '../../ui/LogInToContinue'
// import { useDeleteComment } from './useDeleteComment'
// import { useUpdateComment } from './useUpdateComment'
import { useAddComment } from './useAddComment'

const TextInput = styled.textarea`
  width: 100%;
  resize: auto;
  /* overflow-y: hidden; */
  outline: none;
  resize: none;
  border: none;
  caret-color: auto;
  color: var(--color-grey-500);
  font: inherit;
  font-size: 1.4rem;
  /* Temporary */
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
  padding: 0.75rem 1rem;
  /* height: 10rem; */
  ${(props) => css`
    height: ${props.height};
  `}
  /*  */
  &::placeholder {
    padding-top: 0.25rem;
    font: inherit;
    color: var(--color-grey-400);
    font-size: 1.4rem;
    font-weight: 300;
  }
  &:focus {
  }
`
const ButtonsContainer = styled.div`
  padding-top: 1rem;
  grid-column: 2/3;
  display: flex;
  gap: 2rem;
  align-items: center;
`
function AddComment({
  user,
  onEditMode = false,
  defaultComment = '',
  inputOnFocus = false,
  onCloseModal,
  inputHeight = '10rem',
}) {
  const ref = useRef(null)
  const [comment, setComment] = useState(defaultComment)
  const [inputIsFocused, setInputIsFocused] = useState(inputOnFocus)
  const { isAddingComment, addComment } = useAddComment()

  const onSubmit = () => {
    if (!comment) return
    if (comment.trim().length > MAX_COMMENT_LENGTH)
      return toast.error(
        `Comment must have less than ${MAX_COMMENT_LENGTH} characters`,
      )
    // if (onEditMode) updateComment(comment, { onSettled: onCloseModal })
    else
      addComment(comment, {
        onSuccess: () => {
          setComment('')
          setInputIsFocused(false)
          ref.current.style.height = '10rem'
        },
      })
  }
  const onFocus = () => {
    if (onEditMode) return
    setInputIsFocused(true)
    ref.current.style.height = '17rem'
  }

  if (!user)
    return (
      <PostLayout>
        <PostLayout.UserImg alt="" src={`${usersImagesUrl}/${DEFAULT_IMG}`} />
        <Modal>
          <Modal.Open window={'confirm-window'}>
            <TextInput placeholder="Add a comment" value={''} />
          </Modal.Open>
          <Modal.Window window={'confirm-window'}>
            <LogInToContinue />
          </Modal.Window>
        </Modal>
      </PostLayout>
    )

  return (
    <PostLayout>
      <PostLayout.UserImg
        alt=""
        src={`${usersImagesUrl}/${user?.photo || DEFAULT_IMG}`}
      />
      <TextInput
        placeholder="Add a comment"
        ref={ref}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isAddingComment}
        onFocus={onFocus}
        height={inputHeight}
      />
      {inputIsFocused && (
        <ButtonsContainer>
          <Button
            size="medium"
            disabled={isAddingComment || !comment}
            onClick={onSubmit}
          >
            {isAddingComment ? (
              <SpinnerMini size={'2rem'} publish={'true'} />
            ) : onEditMode ? (
              'Edit'
            ) : (
              'Submit'
            )}
          </Button>
          <Button
            size="medium"
            variation="secondary"
            disabled={isAddingComment}
            onClick={() => setComment('')}
          >
            Clear
          </Button>
        </ButtonsContainer>
      )}
    </PostLayout>
  )
}

export default AddComment
