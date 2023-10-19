import styled from 'styled-components'
import AddComment from './AddComment'
const Container = styled.div`
  width: 70rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-height: 50rem;
  @media screen and (max-width: 43.75em) {
    /* <=700px */
    width: 60rem;
  }
  @media screen and (max-width: 31.25em) {
    /* <=500px */
    width: 55rem;
    gap: 2rem;
  }

  @media screen and (max-width: 28.125em) {
    /* <=450px */
    width: 50rem;
  }
  @media screen and (max-width: 25em) {
    /* <=400px */
    gap: 1.5rem;
    width: 44rem;
  }
  @media screen and (max-width: 21.875em) {
    /* <=350px */
    width: 41rem;
  }
  @media screen and (max-width: 20.625em) {
    /* <=320px */
    width: 39rem;
  }
`
const Title = styled.h1`
  @media screen and (max-width: 37.5em) {
    /* <=600px */
    font-size: 2.5rem;
  }
`
function EditComment({ disabled, commentObj, onConfirm }) {
  return (
    <Container>
      <Title>Edit comment</Title>
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
