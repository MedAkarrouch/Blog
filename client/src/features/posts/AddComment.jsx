import styled from "styled-components"
import PostLayout from "./PostLayout"
import { useAutoTextareaResize } from "../../hooks/useAutoTextareaResize"
import Button from "../account/Button"

const TextInput = styled.textarea`
  width: 100%;
  resize: auto;
  overflow-y: hidden;
  outline: none;
  resize: none;
  border: none;
  caret-color: auto;
  color: var(--color-grey-500);
  font-size: 1.4rem;
  font: inherit;
  /* Temporary */
  border: 1px solid var(--color-grey-100);
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
  padding: 0.75rem 1rem;
  min-height: 10rem;
  /*  */
  &::placeholder {
    color: currentColor;
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
function AddComment() {
  const ref = useAutoTextareaResize()
  return (
    <PostLayout>
      <PostLayout.UserImg
        alt=""
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q9Kwp-uC--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609838/bc3ac0a6-8c2e-4c51-8fdd-83bd3d6ec159.jpeg"
      />
      {/* <PostLayout.Content> */}
      <TextInput placeholder="Add a comment" ref={ref} />
      <ButtonsContainer>
        <Button size="medium">Submit</Button>
        <Button size="medium" variation="secondary">
          Cancel
        </Button>
      </ButtonsContainer>
      {/* </PostLayout.Content> */}
    </PostLayout>
  )
}

export default AddComment
