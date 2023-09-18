import styled from "styled-components"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getPosts } from "../services/apiPosts"
import { PAGE_SIZE } from "../utils/constants"

const StyledContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* background-color: var(--color-grey-100); */
`
function Test() {
  const {
    data,
    isSuccess,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    ["repositories"],
    ({ pageParam = 1 }) =>
      getPosts({
        search: "",
        category: "",
        page: pageParam,
        pageSize: PAGE_SIZE
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = Math.ceil(lastPage.count / PAGE_SIZE)
        const nextPage =
          allPages.length < maxPages ? allPages.length + 1 : undefined
        console.log(nextPage)
        return nextPage
      }
    }
  )
  if (isError) return <h1>{error}</h1>
  if (isLoading) return <h1>Loading....</h1>

  console.log(hasNextPage)

  return (
    <StyledContent>
      {data.pages.map((page) =>
        page.posts.map((item) => (
          <div style={{ border: "3px solid #EEE" }} key={item.id}>
            <p>{item.title}</p>
          </div>
        ))
      )}
      <button
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Fetching..."
          : hasNextPage
          ? "Show more"
          : "No more results"}
      </button>
    </StyledContent>
  )
}

async function getData(page) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=10&page=${page}`
  )
  return response.json()
}

export default Test
