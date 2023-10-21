import Table from '../../ui/Table'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import styled from 'styled-components'
import { useReadingList } from './useReadingList'
import ReadingListRow from './ReadingListRow'

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function ReadingListTable() {
  const { isLoading, count, readingList } = useReadingList()
  // console.log(isLoading, count, posts)

  if (isLoading)
    return (
      <SpinnerWrapper>
        <Spinner size="4rem" />
      </SpinnerWrapper>
    )

  return (
    // <Table columns="7rem 2fr 0.7fr 0.7fr 3rem ">
    <Table gap={'1rem'} columns={'3.5rem 1fr max-content'}>
      <Table.Header>
        <div></div>
        <div>Post</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={readingList}
        render={(item) => (
          <ReadingListRow key={item.post._id} post={item.post} />
        )}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  )
}

export default ReadingListTable
