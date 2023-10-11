import styled from 'styled-components'
import DashboardTable from '../ui/DashboardTable'
import Modal from '../ui/Modal'
import Stats from '../ui/Stats'

const Container = styled.div`
  max-width: 95rem;
  margin: 10rem auto;
`

function Dashboard() {
  return (
    <Container>
      <Stats />
      <Modal>
        <DashboardTable />
      </Modal>
    </Container>
  )
}

export default Dashboard
