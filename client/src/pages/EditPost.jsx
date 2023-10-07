import { usePost } from '../features/posts/usePost'
import Spinner from '../ui/Spinner'
import AddEditPost from './AddEditPost'

function EditPost() {
  const { isLoading, post } = usePost()
  if (isLoading) return <Spinner />
  if (!post) return <div>Post is not found</div>
  return <AddEditPost post={post} />
}

export default EditPost
