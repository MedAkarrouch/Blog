import styled from 'styled-components'
import PostsLayout from '../ui/PostsLayout'
import Main from '../ui/Main'
import Header from '../ui/Header'
import Footer from '../ui/Footer'

const StyledContent = styled.div`
  max-width: 125rem;
  margin: 0 auto;
  padding-bottom: 4rem;
`

function Home() {
  return (
    <>
      <Header hideSearchbar={false} />
      <Main page="home">
        <StyledContent>
          <PostsLayout />
        </StyledContent>
      </Main>
      <Footer home={true} />
    </>
  )
}

export default Home
