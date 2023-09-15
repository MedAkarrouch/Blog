import styled from "styled-components"
import { usePost } from "../features/posts/usePost"
import Spinner from "../ui/Spinner"
import PostDetail from "../features/posts/PostDetail"

const StyledPost = styled.div`
  padding: 2rem;
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
    <StyledPost>
      <PostDetail post={post} />
    </StyledPost>
  )
}

export default Post
