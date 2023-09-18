import Filter from "../ui/Filter"
import Posts from "../features/posts/Posts"
import Spinner from "../ui/Spinner"
import { usePosts } from "../features/posts/usePosts"
import Pagination from "../ui/Pagination"

function PostsLayout() {
  const { posts, isLoading, count } = usePosts()
  return (
    <>
      <Filter />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5rem"
          }}
        >
          <Spinner />
        </div>
      ) : posts.length ? (
        <>
          <Posts posts={posts} />
          <Pagination count={count} />
        </>
      ) : (
        <div>
          <h2>No results found</h2>
          <p>It seems we can’t find any results based on your search.</p>
        </div>
      )}
    </>
  )
}

export default PostsLayout
