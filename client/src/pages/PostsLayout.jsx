import styled from 'styled-components'
import Filter from '../ui/Filter'
import Posts from '../features/posts/Posts'
import Spinner from '../ui/Spinner'
import { usePosts } from '../features/posts/usePosts'
import SpinnerMini from '../ui/SpinnerMini'
import ErrorMessage from '../ui/ErrorMessage'

const Button = styled.button`
  color: var(--color-grey-500);
  background-color: #fff;
  display: block;
  max-width: 30rem;
  margin: 0 auto;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  border: 2px solid #eee;
  border: 2px solid var(--color-grey-100);
  font-weight: 500;
  font-size: 1.6rem;
  &:hover {
    background-color: var(--color-grey-50);
    color: var(--color-grey-400);
  }
`
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
      <Filter />
      {isError ? (
        <ErrorMessage />
      ) : isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : posts.length ? (
        <>
          <Posts
            posts={posts}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
          {isFetchingNextPage ? (
            <StyledSpinner>
              <SpinnerMini />
              <span>Loading more...</span>
            </StyledSpinner>
          ) : posts?.length === postsCount ? (
            <EndOfList>You’ve reached the end of the list</EndOfList>
          ) : null}
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
// function PostsLayout() {
//   const {
//     posts,
//     isLoading,
//     isError,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingNextPage,
//   } = usePosts()

//   return (
//     <>
//       <Filter />
//       {isError ? (
//         <ErrorMessage />
//       ) : isLoading ? (
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginTop: '5rem',
//           }}
//         >
//           <Spinner />
//         </div>
//       ) : posts.length ? (
//         <>
//           <Posts posts={posts} />
//           {isFetchingNextPage ? (
//             <StyledSpinner>
//               <SpinnerMini />
//               <span>Loading more...</span>
//             </StyledSpinner>
//           ) : hasNextPage ? (
//             <Button
//               disabled={isFetchingNextPage || !hasNextPage}
//               onClick={() => fetchNextPage()}
//             >
//               Show more
//             </Button>
//           ) : (
//             <EndOfList>You’ve reached the end of the list</EndOfList>
//           )}
//         </>
//       ) : (
//         <NoResults>
//           <h2>No results found</h2>
//           <p>It seems we can’t find any results based on your search.</p>
//         </NoResults>
//       )}
//     </>
//   )
// }

export default PostsLayout
