import Table from '../../ui/Table'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import styled from 'styled-components'
import { useReadingList } from './useReadingList'
import ReadingListRow from './ReadingListRow'

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1/-1;
  padding: 3rem 0;
`

function ReadingListTable() {
  const { isLoading, count, readingList } = useReadingList()
  // console.log(isLoading, count, posts)

  return (
    <Table gap={'1rem'} columns={'7rem 1fr max-content'}>
      <Table.Header>
        <div></div>
        <div>Post</div>
        <div></div>
      </Table.Header>
      {isLoading ? (
        <Table.Row>
          <SpinnerWrapper>
            <Spinner size="4rem" />
          </SpinnerWrapper>
        </Table.Row>
      ) : (
        <Table.Body
          data={readingList}
          render={(item) => (
            <ReadingListRow key={item.post._id} post={item.post} />
          )}
        />
      )}
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  )
}

export default ReadingListTable
