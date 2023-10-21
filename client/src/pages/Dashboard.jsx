import styled from 'styled-components'
import DashboardTable from '../features/Dashboard/DashboardTable'
import Modal from '../ui/Modal'
import Stats from '../ui/Stats'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import Main from '../ui/Main'

const Content = styled.div`
  max-width: 95rem;
  max-width: 125rem;
  margin: 0 auto;
  padding: 2rem 0 5rem 0;
`
const StyledMain = styled(Main)`
  background-color: var(--color-grey-50);
  min-height: calc(100vh - 22rem);
`
const TableContainer = styled.div`
  max-width: 110rem;
  margin: 0 auto;
`

function Dashboard() {
  return (
    <>
      <Header />
      <StyledMain>
        <Content>
          <Stats />
          <TableContainer>
            <Modal>
              <DashboardTable />
            </Modal>
          </TableContainer>
        </Content>
      </StyledMain>
      <Footer />
    </>
  )
}

export default Dashboard
