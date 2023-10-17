import styled from 'styled-components'
import PostsLayout from '../ui/PostsLayout'
import Main from '../ui/Main'
import Header from '../ui/Header'

const StyledContent = styled.div`
  max-width: 125rem;
  margin: 0 auto;
  padding-bottom: 4rem;
`

function Home() {
  return (
    <>
      <Header />
      <Main page="home">
        <StyledContent>
          <PostsLayout />
        </StyledContent>
      </Main>
    </>
  )
}

export default Home
