import styled from "styled-components"
import AddComment from "./AddComment"
import { useUser } from "../auth/useUser"
const Container = styled.div`
  width: 70rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-height: 50rem;
`
function EditComment({ comment }) {
  const { user } = useUser()
  return (
    <Container>
      <h1>Edit comment</h1>
      <AddComment
        user={user}
        onEditMode={true}
        defaultComment={comment}
        inputOnFocus={true}
      />
    </Container>
  )
}

export default EditComment
