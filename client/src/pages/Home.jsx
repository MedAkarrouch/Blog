import styled from 'styled-components'
import PostsLayout from '../ui/PostsLayout'
import Main from '../ui/Main'

const StyledContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding-bottom: 4rem;
`

function Home() {
  return (
    <Main page="home">
      <StyledContent>
        <PostsLayout />
      </StyledContent>
    </Main>
  )
}

export default Home
