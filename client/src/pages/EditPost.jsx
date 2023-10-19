import styled from 'styled-components'
import { useUser } from '../features/auth/useUser'
import { usePost } from '../features/posts/usePost'
import Header from '../ui/Header'
import Spinner from '../ui/Spinner'
import AddEditPost from './AddEditPost'
import Main from '../ui/Main'

const StyledMain = styled(Main)`
  background-color: var(--color-grey-50);
`

function EditPost() {
  const { isLoading, post } = usePost()
  const { user } = useUser()
  // if (isLoading) return <Spinner />
  // if (!post) return <div>Post is not found</div>
  // if (post?.author?._id !== user?._id) return <div>Post is not yours</div>
  return (
    <>
      <Header />
      {isLoading ? (
        <Spinner.Wrapper subtract="7rem">
          <Spinner />
        </Spinner.Wrapper>
      ) : (
        <StyledMain>
          <AddEditPost post={post} onEditMode={true} />
        </StyledMain>
      )}
    </>
  )
}

export default EditPost
