import styled from "styled-components"
import Posts from "../features/posts/Posts"
import { usePosts } from "../features/posts/usePosts"
import Spinner from "../ui/Spinner"
import Searchbar from "../ui/Searchbar"

const StyledHome = styled.div`
  padding: 0 2rem;
  margin-top: 10rem;
`
const StyledContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

function Home() {
  const { isLoading, posts } = usePosts()
  console.log(posts)
  if (isLoading)
    return (
      <Spinner.Wrapper subtract="7rem">
        <Spinner />
      </Spinner.Wrapper>
    )
  return (
    <StyledHome>
      <StyledContent>
        <Searchbar />
        <Posts posts={posts} />
      </StyledContent>
    </StyledHome>
  )
}

export default Home
