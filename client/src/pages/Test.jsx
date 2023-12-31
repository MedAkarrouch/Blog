import styled from 'styled-components'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts } from '../services/apiPosts'
import { PAGE_SIZE } from '../utils/constants'
import { useEffect, useRef, useState } from 'react'
import { getPostComments } from '../services/apiComments'
import Filter from '../ui/Filter'
import Slider from '../ui/Slider'
import ScrollMenu from '../ui/ScrollMenu'
// import Slider from '../ui/Slider'

// Import css files
// Import css files

const StyledContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  /* background-color: var(--color-grey-100); */
  padding: 10rem 0;
`
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: var(--color-orange-50); */
`

function Test() {
  return (
    <Container>
      <ScrollMenu filedName={'category'} />
    </Container>
  )
}

// /
// function Test() {
//   const ref = useRef()
//   const {
//     data,
//     isSuccess,
//     isError,
//     isLoading,
//     error,
//     isFetching,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery(
//     ['repositories'],
//     ({ pageParam = 1 }) =>
//       getPosts({
//         search: '',
//         category: '',
//         page: pageParam,
//         pageSize: PAGE_SIZE,
//       }),
//     {
//       getNextPageParam: (lastPage, allPages) => {
//         const maxPages = Math.ceil(lastPage.count / PAGE_SIZE)
//         const nextPage =
//           allPages.length < maxPages ? allPages.length + 1 : undefined
//         return nextPage
//       },
//     },
//   )
//   console.log(data)
//   //
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries
//         if (!entry.isIntersecting) return
//         if (!isFetchingNextPage && hasNextPage) fetchNextPage()
//       },
//       {
//         root: null,
//         rootMargin: '0px',
//         threshold: 1.0,
//       },
//     )
//     if (ref.current) observer.observe(ref.current)
//     return () => observer.unobserve(ref.current)
//   }, [ref, hasNextPage, isFetchingNextPage, fetchNextPage])
//   //
//   if (isError) return <h1>{error}</h1>
//   if (isLoading) return <h1>Loading....</h1>
//   //
//   const posts = data.pages.reduce((acc, page) => {
//     return [...acc, ...page.posts]
//   }, [])

//   return (
//     <StyledContent>
//       {posts.map((post, index) => {
//         if (index + 1 === posts.length)
//           return (
//             <div
//               ref={ref}
//               style={{ border: '3px solid #EEE', padding: '10rem' }}
//               key={post._id}
//             >
//               <h1>#{index + 1}</h1>
//               <p>{post.title}</p>
//             </div>
//           )
//         else
//           return (
//             <div
//               style={{ border: '3px solid #EEE', padding: '10rem' }}
//               key={post._id}
//             >
//               <h1>#{index + 1}</h1>
//               <p>{post.title}</p>
//             </div>
//           )
//       })}
//       {/* <button
//         disabled={isFetchingNextPage || !hasNextPage}
//         onClick={() => fetchNextPage()}
//       > */}
//       {isFetchingNextPage
//         ? 'Fetching...'
//         : hasNextPage
//         ? 'Show more'
//         : 'No more results'}
//       {/* </button> */}
//     </StyledContent>
//   )
// }

// function Test() {
//   const [count, setCount] = useState(0)
//   const ref = useRef(null)
//   useEffect(() => {
//     console.log(ref.current)
//     return () => {
//       console.log("Cleanup Fn count = ", ref.current)
//     }
//   }, [count])
//   return (
//     <div>
//       <h1>Count = {count}</h1>
//       <button
//         ref={count > 0 ? ref : null}
//         onClick={() => setCount((c) => c + 1)}
//       >
//         +
//       </button>
//       <button
//         ref={count <= 0 ? ref : null}
//         onClick={() => setCount((c) => c - 1)}
//       >
//         -
//       </button>
//     </div>
//   )
// }

export default Test
