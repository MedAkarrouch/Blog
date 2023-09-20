import styled from "styled-components"

import PostItem from "./PostItem"

const StyledPosts = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 3rem;
`

function Posts({ posts }) {
  return (
    <StyledPosts>
      {posts?.map((post, index) => (
        <PostItem key={post._id} post={post} />
      ))}
    </StyledPosts>
  )
}

export default Posts

// <StyledPosts>
//   {posts?.map((post, index) => {
//     if (index < posts.length - 1)
//       return (
//         <>
//           <PostItem key={post._id} post={post} />
//           <StyledLine key={index} />
//         </>
//       )
//     else return <PostItem key={post._id} post={post} />
//   })}
// </StyledPosts>
