import styled from 'styled-components'
import { usePost } from '../features/posts/usePost'
import Spinner from '../ui/Spinner'
import PostDetail from '../features/posts/PostDetail'
import Aside from '../ui/Aside'
import PostComments from '../features/comments/PostComments'
import { useMemo, useRef } from 'react'
import Modal from '../ui/Modal'

const StyledPost = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding: 2rem;
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
  if (isError || !post) return <div>No post found !</div>

  return (
    <Container>
      <Modal>
        <Aside post={post} commentsSection={commentsSection} />
      </Modal>
      <StyledPost>
        <PostDetail post={post} />
        <PostComments ref={commentsSection} />
      </StyledPost>
    </Container>
  )
}

export default Post
