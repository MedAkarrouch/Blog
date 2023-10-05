import styled, { css } from 'styled-components'
import { useUserPosts } from '../features/posts/useUserPosts'
import Spinner from '../ui/Spinner'
import DashboardTable from '../ui/DashboardTable'
import Modal from '../ui/Modal'

const Container = styled.div`
  max-width: 95rem;
  margin: 10rem auto;
`
const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function Dashboard() {
  // const { isLoading, count, posts } = useUserPosts()
  // console.log(isLoading, count, posts)
  return (
    <Container>
      <Modal>
        <DashboardTable />
      </Modal>
    </Container>
  )
}

export default Dashboard
