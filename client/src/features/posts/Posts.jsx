import styled from 'styled-components'

import PostItem from './PostItem'
import { useEffect, useRef } from 'react'

const StyledPosts = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 3rem;
`

function Posts({ posts, fetchNextPage, isFetchingNextPage, hasNextPage }) {
  const lastPostRef = useRef(null)

  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0 }
    const callBackFn = (entries) => {
      const [entry] = entries
      console.log(lastPostRef.current)
      if (!entry.isIntersecting) return
      if (!isFetchingNextPage && hasNextPage) fetchNextPage()
    }
    const observer = new IntersectionObserver(callBackFn, options)
    if (lastPostRef.current && hasNextPage)
      observer.observe(lastPostRef.current)
    return () => observer.disconnect()
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <StyledPosts>
      {posts?.map((post, index) => (
        <PostItem
          ref={index === posts?.length - 1 ? lastPostRef : null}
          key={post._id}
          post={post}
        />
      ))}
    </StyledPosts>
  )
}

export default Posts
