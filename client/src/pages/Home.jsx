import styled from 'styled-components'
import Searchbar from '../ui/Searchbar'
import PostsLayout from './PostsLayout'

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
  padding-bottom: 10rem;
`
function Home() {
  return (
    <StyledHome>
      <StyledContent>
        <Searchbar />
        <PostsLayout />
      </StyledContent>
    </StyledHome>
  )
}

export default Home
