import styled from 'styled-components'
import AddComment from './AddComment'
const Container = styled.div`
  width: 70rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-height: 50rem;
`
function EditComment({ disabled, commentObj, onConfirm }) {
  return (
    <Container>
      <h1>Edit comment</h1>
      <AddComment
        commentObj={commentObj}
        onConfirm={onConfirm}
        isUpdating={disabled}
        onEditMode={true}
        inputOnFocus={true}
        inputHeight="25rem"
      />
    </Container>
  )
}

export default EditComment
