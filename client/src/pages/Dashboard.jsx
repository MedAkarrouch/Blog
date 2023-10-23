import styled from 'styled-components'
import DashboardTable from '../features/Dashboard/DashboardTable'
import Modal from '../ui/Modal'
import Stats from '../ui/Stats'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import Main from '../ui/Main'
import Heading from '../ui/Heading'
import SortBy from '../features/Dashboard/SortBy'

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
const options = [
  { label: 'Sort by date (recent first)', value: 'date-desc' },
  { label: 'Sort by date (earlier first)', value: 'date-asc' },
  { label: 'Sort by stats (high first)', value: 'stats-desc' },
  { label: 'Sort by stats (low first)', value: 'stas-asc' },
]

function Dashboard() {
  return (
    <>
      <Header />
      <StyledMain>
        <Content>
          <H1 as="h1">Dashboard</H1>
          <Stats />
          <SortBy page="dashboard" options={options} />
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
