import styled from "styled-components"
import Searchbar from "./Searchbar"
import Filter from "./Filter"
import Posts from "../features/posts/Posts"
import { useSearchParams } from "react-router-dom"

const StyledContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

function HomeContent({ children }) {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const searchFor = searchParams.get("searchFor") || "posts"
  // if (searchFor === "users" && searchParams.has("category")) {
  //   searchParams.delete("category")
  //   setSearchParams(searchParams)
  // }
  // if (searchParams.has("search") && !searchParams.get("search")) {
  //   searchParams.delete("search")
  //   setSearchParams(searchParams)
  // }
  return (
    <StyledContent>
      <Searchbar />
      {/* {searchFor === "posts" && <Filter />} */}
      {children}
      {/* <Posts posts={posts} /> */}
    </StyledContent>
  )
}

export default HomeContent
