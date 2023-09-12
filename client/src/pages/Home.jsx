import Posts from "../features/posts/Posts"
import { usePosts } from "../features/posts/usePosts"
import Spinner from "../ui/Spinner"

function Home() {
  const { isLoading, posts } = usePosts()
  console.log(posts)
  if (isLoading)
    return (
      <Spinner.Wrapper subtract="7rem">
        <Spinner />
      </Spinner.Wrapper>
    )
  return (
    <div>
      <Posts posts={posts} />
    </div>
  )
}

export default Home
