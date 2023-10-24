import styled from 'styled-components'
import Footer from '../ui/Footer'
import Header from '../ui/Header'
import Main from '../ui/Main'
import ReadingListTable from '../features/readingLists/ReadingListTable'
import { useReadingList } from '../features/readingLists/useReadingList'
import Heading from '../ui/Heading'
import SortBy from '../features/Dashboard/SortBy'
import { sortByReadingListArr } from '../utils/constants'

const StyledMain = styled(Main)`
  background-color: var(--color-grey-50);
  min-height: calc(100vh - 17rem);
`
const TableContainer = styled.div`
  max-width: 110rem;
  padding: 2rem 0 5rem 0;
  margin: 0 auto;
`
const H1 = styled(Heading)`
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 600;
`

function ReadingList() {
  const { isLoading, count, readingList } = useReadingList()
  console.log({ isLoading, count, readingList })
  return (
    <>
      <Header />
      <StyledMain>
        <TableContainer>
          <H1 as="h1">Reading list</H1>
          <SortBy page="readingList" options={sortByReadingListArr} />
          <ReadingListTable />
        </TableContainer>
      </StyledMain>
      <Footer />
    </>
  )
}

export default ReadingList
