import styled from "styled-components"
import { useState } from "react"
import { useAutoTextareaResize } from "../../hooks/useAutoTextareaResize"
import Button from "../account/Button"
import PostLayout from "./PostLayout"
import { useCommentOnPost } from "./useCommentOnPost"
import { usersImagesUrl } from "../../utils/constants"

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
    commentOnPost(comment)
  }

  return (
    <PostLayout>
      <PostLayout.UserImg
        alt=""
        src={`${usersImagesUrl}/${user.photo}`}
        // src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q9Kwp-uC--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609838/bc3ac0a6-8c2e-4c51-8fdd-83bd3d6ec159.jpeg"
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
            Submit
          </Button>
          <Button
            size="medium"
            variation="secondary"
            disabled={isLoading}
            onClick={() => setComment("")}
          >
            Cancel
          </Button>
        </ButtonsContainer>
      )}
      {/* </PostLayout.Content> */}
    </PostLayout>
  )
}

export default AddComment
