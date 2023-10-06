import styled from 'styled-components'
import DashboardTable from '../ui/DashboardTable'
import Modal from '../ui/Modal'

const Container = styled.div`
  max-width: 95rem;
  margin: 10rem auto;
`

function Dashboard() {
  return (
    <Container>
      <Modal>
        <DashboardTable />
      </Modal>
    </Container>
  )
}

export default Dashboard
