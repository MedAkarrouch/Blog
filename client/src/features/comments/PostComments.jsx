import styled from "styled-components"
import PostComment from "./PostComment"
import Heading from "../../ui/Heading"
import AddComment from "./AddComment"
import { useUser } from "../auth/useUser"
import PostCommentForLoggedInUser from "./PostCommentForLoggedInUser"
import { useEffect, useMemo, useRef, useState } from "react"
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

function PostComments({ post }) {
  const {
    comments: { totalComments, comments }
  } = post
  const { user } = useUser()
  const [maxNumComments, setMaxNumComments] = useState(5)
  const ref = useRef(null)
  const hasAlreadyCommented = useMemo(
    () => comments?.some((comment) => comment.user._id === user?._id),
    [totalComments]
  )

  const visibleComments = useMemo(
    () =>
      comments?.sort(
        (a, b) => new Date(b.commentedAt) - new Date(a.commentedAt)
      ),
    [totalComments]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry.isIntersecting) return
        if (maxNumComments < totalComments)
          setMaxNumComments((prev) => prev + 5)
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0
      }
    )
    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [maxNumComments, totalComments])

  return (
    <Container>
      <StyledHeading as="h1">
        Comments
        <NumComments> ({totalComments})</NumComments>
      </StyledHeading>
      {!hasAlreadyCommented && <AddComment user={user} />}
      {visibleComments
        ?.slice(0, maxNumComments)
        .map((postComment, index) =>
          postComment.user._id === user?._id ? (
            <PostCommentForLoggedInUser
              key={postComment._id}
              postComment={postComment}
              ref={index === maxNumComments - 1 ? ref : null}
            />
          ) : (
            <PostComment
              key={postComment._id}
              postComment={postComment}
              ref={index === maxNumComments - 1 ? ref : null}
            />
          )
        )}
    </Container>
  )
}
// function PostComments({ post }) {
//   const { comments: postComments } = post
//   // const { comments: postComments } = post
//   const { user } = useUser()
//   const [maxNumComments, setMaxNumComments] = useState(5)
//   const ref = useRef(null)
//   const hasAlreadyCommented = postComments?.comments?.some(
//     (comment) => comment.user._id === user?._id
//   )
//   console.log(postComments.totalComments)
//   const comments = useMemo(
//     () =>
//       postComments?.comments.sort(
//         (a, b) => new Date(b.commentedAt) - new Date(a.commentedAt)
//       ),
//     [postComments.totalComments]
//   )
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries
//         if (!entry.isIntersecting) return
//         if (maxNumComments < postComments.totalComments)
//           setMaxNumComments((prev) => prev + 5)
//       },
//       {
//         root: null,
//         rootMargin: "0px",
//         threshold: 1
//       }
//     )
//     if (ref.current) observer.observe(ref.current)

//     return () => observer.disconnect()
//   }, [maxNumComments, postComments?.totalComments])

//   return (
//     <Container>
//       <StyledHeading as="h1">
//         Comments
//         <NumComments> ({postComments?.totalComments})</NumComments>
//       </StyledHeading>
//       {!hasAlreadyCommented && <AddComment user={user} />}
//       {comments
//         ?.slice(0, maxNumComments)
//         .map((postComment, index) =>
//           postComment.user._id === user?._id ? (
//             <PostCommentForLoggedInUser
//               key={postComment._id}
//               postComment={postComment}
//               ref={index === maxNumComments - 1 ? ref : null}
//             />
//           ) : (
//             <PostComment
//               key={postComment._id}
//               postComment={postComment}
//               ref={index === maxNumComments - 1 ? ref : null}
//             />
//           )
//         )}
//     </Container>
//   )
// }

export default PostComments
