import styled from 'styled-components'
import Footer from '../ui/Footer'
import Header from '../ui/Header'
import Main from '../ui/Main'
import ReadingListTable from '../features/readingLists/ReadingListTable'
import { useReadingList } from '../features/readingLists/useReadingList'

const StyledMain = styled(Main)`
  background-color: var(--color-grey-50);
  min-height: calc(100vh - 22rem);
`
const TableContainer = styled.div`
  max-width: 110rem;
  padding: 5rem 0;
  margin: 0 auto;
`

function ReadingList() {
  const { isLoading, count, readingList } = useReadingList()
  console.log({ isLoading, count, readingList })
  return (
    <>
      <Header />
      <StyledMain>
        <TableContainer>
          <ReadingListTable />
        </TableContainer>
      </StyledMain>
      <Footer />
    </>
  )
}

export default ReadingList
