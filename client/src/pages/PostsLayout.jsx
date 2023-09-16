import Filter from "../ui/Filter"
import Posts from "../features/posts/Posts"
import Spinner from "../ui/Spinner"
import { usePosts } from "../features/posts/usePosts"

function PostsLayout() {
  const { posts, isLoading } = usePosts()
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
      ) : (
        <Posts posts={posts} />
      )}
      <Posts />
    </>
  )
}

export default PostsLayout
