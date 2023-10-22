import styled from 'styled-components'
import DashboardTable from '../features/Dashboard/DashboardTable'
import Modal from '../ui/Modal'
import Stats from '../ui/Stats'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import Main from '../ui/Main'
import Heading from '../ui/Heading'

const Content = styled.div`
  max-width: 125rem;
  margin: 0 auto;
  padding: 2rem 0 5rem 0;
`
const StyledMain = styled(Main)`
  background-color: var(--color-grey-50);
  min-height: calc(100vh - 22rem);
`
const H1 = styled(Heading)`
  font-size: 3rem;
  margin-bottom: 2rem;
`

function Dashboard() {
  return (
    <>
      <Header />
      <StyledMain>
        <Content>
          <H1 as="h1">Dashboard</H1>
          <Stats />
          <Modal>
            <DashboardTable />
          </Modal>
        </Content>
      </StyledMain>
      <Footer />
    </>
  )
}

export default Dashboard
