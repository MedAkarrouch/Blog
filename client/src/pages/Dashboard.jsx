import styled from 'styled-components'
import DashboardTable from '../ui/DashboardTable'
import Modal from '../ui/Modal'
import Stats from '../ui/Stats'

const Content = styled.div`
  max-width: 95rem;
  max-width: 105rem;
  margin: 0 auto;
  padding: 2rem 0 5rem 0;
`
const Container = styled.div`
  background-color: var(--color-grey-50);
  min-height: calc(100vh - 7rem);
`

function Dashboard() {
  return (
    <Container>
      <Content>
        <Stats />
        <Modal>
          <DashboardTable />
        </Modal>
      </Content>
    </Container>
  )
}

export default Dashboard
