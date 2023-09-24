import styled from "styled-components"
import { usePost } from "../features/posts/usePost"
import Spinner from "../ui/Spinner"
import PostDetail from "../features/posts/PostDetail"
import Aside from "../ui/Aside"
import PostComments from "../features/posts/PostComments"

const StyledPost = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`
const Container = styled.div`
  /* padding-left: 8rem; */
`

function Post() {
  const { isLoading, post, isError } = usePost()
  if (isLoading)
    return (
      <Spinner.Wrapper subtract="7rem">
        <Spinner />
      </Spinner.Wrapper>
    )
  if (isError) return <div>No post found !</div>
  return (
    <Container>
      <Aside />
      <StyledPost>
        <PostDetail post={post} />
        <PostComments post={post} />
      </StyledPost>
    </Container>
  )
}

export default Post
