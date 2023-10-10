import styled from 'styled-components'
import Heading from '../../ui/Heading'
import AddComment from './AddComment'
import { forwardRef } from 'react'
import Modal from '../../ui/Modal'
import PostCommentsContent from './PostCommentsContent'
import { usePost } from '../posts/usePost'

const Container = styled.div`
  padding-top: 3rem;
  border-top: 2px solid var(--color-grey-200);
`
const StyledHeading = styled(Heading)`
  margin-bottom: 3rem;
  font-size: 3.5rem;
  font-weight: 700;
`
const NumComments = styled.span`
  font-size: 3rem;
`

const PostComments = forwardRef(function PostComments(_, ref) {
  const { post, comments, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePost()
  console.log(comments, hasNextPage)

  // console.log({ comments, isLoading, totalComments, comments })

  return (
    <Container ref={ref}>
      <StyledHeading as="h1">
        Comments
        <NumComments> ({post.commentsCount})</NumComments>
      </StyledHeading>
      <AddComment />
      <Modal>
        <PostCommentsContent
          commentsCount={post?.commentsCount}
          comments={comments}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Modal>
    </Container>
  )
})

// const PostComments = forwardRef(function PostComments(_, ref) {
//   const { user } = useUser()
//   const {
//     isLoading,
//     post,
//     comments,
//     isError,
//     isFetchingNextPage,
//     fetchNextPage,
//     hasNextPage,
//   } = usePost()

//   // console.log({ comments, isLoading, totalComments, comments })

//   return (
//     <Container ref={ref}>
//       {isLoading ? (
//         <SpinnerWrapper>
//           <Spinner size={'5rem'} />
//         </SpinnerWrapper>
//       ) : isError ? (
//         <span>Something went wrong, try again later</span>
//       ) : (
//         <>
//           <StyledHeading as="h1">
//             Comments
//             <NumComments> ({post.commentsCount})</NumComments>
//           </StyledHeading>
//           <AddComment user={user} />
//           <Modal>
//             <PostCommentsContent
//               user={user}
//               comments={comments}
//               hasNextPage={hasNextPage}
//               fetchNextPage={fetchNextPage}
//               isFetchingNextPage={isFetchingNextPage}
//             />
//           </Modal>
//         </>
//       )}
//     </Container>
//   )
// })

export default PostComments
