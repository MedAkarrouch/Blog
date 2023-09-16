import styled from "styled-components"
import { usePosts } from "../features/posts/usePosts"
import Spinner from "../ui/Spinner"
import HomeContent from "../ui/HomeContent"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import Searchbar from "../ui/Searchbar"
import PostsLayout from "./PostsLayout"
import Users from "./Users"
import { useEffect } from "react"

const StyledHome = styled.div`
  padding: 0 2rem;
  margin-top: 10rem;
`
const StyledContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
function Home() {
  return (
    <StyledHome>
      <StyledContent>
        <Searchbar />
        <Outlet />
      </StyledContent>
    </StyledHome>
  )
}
// function Home() {
//   const { isLoading, posts } = usePosts()
//   console.log(posts)
//   if (isLoading)
//     return (
//       <Spinner.Wrapper subtract="7rem">
//         <Spinner />
//       </Spinner.Wrapper>
//     )
//   return (
//     <StyledHome>
//       <HomeContent posts={posts} />
//     </StyledHome>
//   )
// }

export default Home
