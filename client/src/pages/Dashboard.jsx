import styled, { css } from 'styled-components'
import { useUserPosts } from '../features/posts/useUserPosts'
import Spinner from '../ui/Spinner'
import DashboardTable from '../ui/DashboardTable'
import Modal from '../ui/Modal'

const Container = styled.div`
  max-width: 95rem;
  margin: 10rem auto;
`

function Dashboard() {
  const { isLoading, count, posts } = useUserPosts()
  console.log(isLoading, count, posts)
  return (
    <Container>
      {isLoading ? null : (
        <Modal>
          <DashboardTable posts={posts} count={count} />
        </Modal>
      )}
    </Container>
  )
}

export default Dashboard
