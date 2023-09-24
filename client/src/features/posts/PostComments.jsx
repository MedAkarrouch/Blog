import styled from "styled-components"
import PostComment from "./PostComment"
import Heading from "../../ui/Heading"
import AddComment from "./AddComment"
const Container = styled.div`
  padding-top: 3rem;
  border-top: 2px solid var(--color-grey-200);
`
const StyledHeading = styled(Heading)`
  margin-bottom: 3rem;
  font-size: 3.5rem;
  font-weight: 700;
`
const NumComments = styled.span`
  font-size: 3rem;
`

function PostComments() {
  return (
    <Container>
      <StyledHeading as="h1">
        Comments
        <NumComments> (27)</NumComments>
      </StyledHeading>
      <AddComment />
      <PostComment />
      <PostComment />
      <PostComment />
      <PostComment />
    </Container>
  )
}

export default PostComments
