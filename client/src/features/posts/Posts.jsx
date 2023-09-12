import styled from "styled-components"

import PostItem from "./PostItem"

const StyledPosts = styled.ul`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`
const StyledLine = styled.div`
  height: 2px;
  width: 20%; //20
  background-color: #eee;
  background-color: var(--color-grey-200);
  margin-left: 40%;
  border-radius: 50px;
`

function Posts({ posts }) {
  return (
    <StyledPosts>
      {posts?.map((post, index) => {
        if (index < posts.length - 1)
          return (
            <>
              <PostItem key={post._id} post={post} />
              <StyledLine />
            </>
          )
        else return <PostItem key={post._id} post={post} />
      })}
    </StyledPosts>
  )
}

export default Posts
