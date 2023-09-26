import styled from "styled-components"
import { useState } from "react"
import { useAutoTextareaResize } from "../../hooks/useAutoTextareaResize"
import Button from "../account/Button"
import PostLayout from "./PostLayout"
import { useCommentOnPost } from "./useCommentOnPost"
import {
  DEFAULT_IMG,
  MAX_COMMENT_LENGTH,
  usersImagesUrl
} from "../../utils/constants"
import SpinnerMini from "../../ui/SpinnerMini"
import { toast } from "react-hot-toast"

const TextInput = styled.textarea`
  width: 100%;
  resize: auto;
  overflow-y: hidden;
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
  /* box-shadow: var(--shadow-sm); */
  padding: 0.75rem 1rem;
  min-height: 10rem;
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
function AddComment({ user }) {
  const ref = useAutoTextareaResize()
  const [comment, setComment] = useState("")
  const [inputIsFocused, setInputIsFocused] = useState(false)
  const { isLoading, commentOnPost } = useCommentOnPost()

  const onSubmit = () => {
    if (!comment) return
    if (comment.trim().length > MAX_COMMENT_LENGTH)
      return toast.error(
        `Comment must have less than ${MAX_COMMENT_LENGTH} characters`
      )
    commentOnPost(comment)
  }

  return (
    <PostLayout>
      <PostLayout.UserImg
        alt=""
        src={`${usersImagesUrl}/${user?.photo || DEFAULT_IMG}`}
      />
      {/* <PostLayout.Content> */}
      <TextInput
        placeholder="Add a comment"
        ref={ref}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isLoading}
        onFocus={() => setInputIsFocused(true)}
      />
      {inputIsFocused && (
        <ButtonsContainer>
          <Button
            size="medium"
            disabled={isLoading || !comment}
            onClick={onSubmit}
          >
            {!isLoading ? (
              "Submit"
            ) : (
              <SpinnerMini size={"2rem"} publish={"true"} />
            )}
          </Button>
          <Button
            size="medium"
            variation="secondary"
            disabled={isLoading}
            onClick={() => setComment("")}
          >
            Clear
          </Button>
        </ButtonsContainer>
      )}
      {/* </PostLayout.Content> */}
    </PostLayout>
  )
}

export default AddComment
