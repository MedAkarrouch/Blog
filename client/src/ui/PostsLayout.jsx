import styled from 'styled-components'
import Posts from '../features/posts/Posts'
import Spinner from './Spinner'
import { usePosts } from '../features/posts/usePosts'
import SpinnerMini from './SpinnerMini'
import ErrorMessage from './ErrorMessage'
import ScrollMenu from './ScrollMenu'
import SortBy from './SortBy'
import Modal from './Modal'
import LogInToContinue from './LogInToContinue'

const StyledSpinner = styled.div`
  justify-content: center;
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--color-orange-400);
  padding: 1rem 2.5rem;
  border: 2px solid transparent;
  span {
    font-size: 1.4rem;
    font-weight: 500;
  }
`
const NoResults = styled.p`
  padding: 4rem 0;
  text-align: center;
  /* color: var(--color-grey-500); */
  /* font-size: 1.5rem; */
`
const EndOfList = styled.p`
  text-align: center;
  color: var(--color-grey-500);
  font-size: 1.5rem;
`
const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`

const PostsHeader = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  gap: 1rem 6rem;
  padding-bottom: 2rem;
  @media screen and (max-width: 43.75em) {
    grid-template-columns: 1fr;
    /* padding-bottom: 2rem; */
  }
`
const SortByContainer = styled.div`
  /* border-bottom: 1px solid var(--color-grey-100); */
`

function PostsLayout() {
  const {
    posts,
    postsCount,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts()

  return (
    <>
      {/* <Filter /> */}
      <PostsHeader>
        <SortByContainer>
          <SortBy />
        </SortByContainer>
        <ScrollMenu filedName="category" />
      </PostsHeader>
      {isError ? (
        <ErrorMessage />
      ) : isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : posts.length ? (
        <>
          <Modal>
            <Posts
              posts={posts}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
            />
            <Modal.Window window="form-login">
              <LogInToContinue />
            </Modal.Window>
          </Modal>
          {isFetchingNextPage && (
            <StyledSpinner>
              <SpinnerMini />
              <span>Loading more...</span>
            </StyledSpinner>
          )}
        </>
      ) : (
        <NoResults>
          <h2>No results found</h2>
          <p>It seems we can’t find any results based on your search.</p>
        </NoResults>
      )}
    </>
  )
}

export default PostsLayout
