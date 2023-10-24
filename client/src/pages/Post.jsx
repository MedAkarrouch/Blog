import styled from 'styled-components'
import { usePost } from '../features/posts/usePost'
import Spinner from '../ui/Spinner'
import PostDetail from '../features/posts/PostDetail'
import Aside from '../ui/Aside'
import PostComments from '../features/comments/PostComments'
import { useRef } from 'react'
import Modal from '../ui/Modal'
import Main from '../ui/Main'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import PageNotFound from './PageNotFound'

const StyledPost = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding: 2rem 0;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  grid-column: 2/-1;
  /* background-color: green; */
`
const Container = styled.div`
  /* padding-left: 8rem; */
  display: grid;
  grid-template-columns: 10rem 1fr;
  max-width: 125rem;
  margin: 0 auto;
  @media screen and (max-width: 37.5em) {
    /* 600 */
    grid-template-columns: 8rem 1fr;
  }
  @media screen and (max-width: 28.125em) {
    /* 450 */
    grid-template-columns: 5.5rem 1fr;
  }
  /* 37.5em */
`

function Post() {
  const { isLoading, post, isError } = usePost()
  const commentsSection = useRef(null)
  console.log({ isLoading, post, isError })
  if (isLoading)
    return (
      <Spinner.Wrapper subtract="7rem">
        <Spinner />
      </Spinner.Wrapper>
    )
  if (isError || !post) return <PageNotFound />

  return (
    <>
      <Header />
      <Main>
        <Container>
          <Modal>
            <Aside post={post} commentsSection={commentsSection} />
          </Modal>
          <StyledPost>
            <PostDetail post={post} />
            <PostComments ref={commentsSection} />
          </StyledPost>
        </Container>
      </Main>
      <Footer />
    </>
  )
}

export default Post
