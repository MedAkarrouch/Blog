import styled, { css } from 'styled-components'
import { memo, useRef, useState } from 'react'
import Button from '../account/Button'
import PostLayout from '../posts/PostLayout'
import {
  DEFAULT_IMG,
  MAX_COMMENT_LENGTH,
  usersImagesUrl,
} from '../../utils/constants'
import { toast } from 'react-hot-toast'
import Modal from '../../ui/Modal'
import LogInToContinue from '../../ui/LogInToContinue'
import { useAddComment } from './useAddComment'
import { useUser } from '../auth/useUser'

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
  onEditMode = false,
  commentObj = {},
  onConfirm,
  isUpdating = false,
  inputOnFocus = false,
  inputHeight = '10rem',
}) {
  const { user } = useUser()
  const ref = useRef(null)
  const [comment, setComment] = useState(commentObj?.comment || '')
  const [inputIsFocused, setInputIsFocused] = useState(inputOnFocus)
  const { isAddingComment, addComment } = useAddComment()
  // const { isUpdating, updateComment } = useUpdateComment()
  const isLoading = isAddingComment || isUpdating

  const onSubmit = () => {
    if (!comment) return
    if (comment.trim().length > MAX_COMMENT_LENGTH)
      return toast.error(
        `Comment must have less than ${MAX_COMMENT_LENGTH} characters`,
      )
    if (onEditMode) onConfirm({ comment: commentObj?._id, newComment: comment })
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
        disabled={isLoading}
        onFocus={onFocus}
        height={inputHeight}
      />
      {inputIsFocused && (
        <ButtonsContainer>
          <Button
            size="medium"
            disabled={isLoading || !comment}
            onClick={onSubmit}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            size="medium"
            variation="secondary"
            disabled={isLoading}
            onClick={() => setComment('')}
          >
            Clear
          </Button>
        </ButtonsContainer>
      )}
    </PostLayout>
  )
}

export default memo(AddComment)
