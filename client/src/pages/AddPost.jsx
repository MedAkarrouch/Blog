import styled from 'styled-components'
import Header from '../ui/Header'
import Main from '../ui/Main'
import AddEditPost from './AddEditPost'

const StyledMain = styled(Main)`
  background-color: var(--color-grey-50);
`

function AddPost() {
  return (
    <>
      <Header />
      <StyledMain>
        <AddEditPost onEditMode={false} />
      </StyledMain>
    </>
  )
}

export default AddPost
