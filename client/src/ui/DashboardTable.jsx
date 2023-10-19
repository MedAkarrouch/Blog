import { useState } from 'react'
import DashboardRow from './DashboardRow'
import Table from './Table'
import Modal, { useModalContext } from './Modal'
import ConfirmDelete from './ConfirmDelete'
import { useDeletePost } from '../features/posts/useDeletePost'
import { useOutsideClick } from '../hooks/useOutsideClick'
import Pagination from './Pagination'
import { useUserPosts } from '../features/posts/useUserPosts'
import Spinner from './Spinner'
import styled from 'styled-components'
import { useWindowListener } from '../hooks/useWindowListener'

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function DashboardTable() {
  const { isLoading, count, posts } = useUserPosts()
  const [selectedId, setSelectedId] = useState(null)
  const { isDeleting, deletePost } = useDeletePost()
  const { currentOpenedWindow, closeWindow } = useModalContext()
  const menuRef = useOutsideClick(() => {
    if (!currentOpenedWindow) setSelectedId(null)
  })
  const [screen, setScreen] = useState(
    window.innerWidth > 600
      ? 'desktop'
      : window.innerWidth <= 450
      ? 'mobile'
      : 'tablet',
  )
  const reseizeHandler = () => {
    if (window.innerWidth > 600) setScreen('desktop')
    else if (window.innerWidth <= 450) setScreen('mobile')
    else setScreen('tablet')
  }
  useWindowListener(reseizeHandler)
  let columns = '7rem 2fr 0.7fr 0.7fr 0.7fr 3rem ',
    gap = '3rem'

  console.log(isLoading, count, posts)
  if (isLoading)
    return (
      <SpinnerWrapper>
        <Spinner size="4rem" />
      </SpinnerWrapper>
    )

  if (screen === 'tablet') {
    columns = '7rem 2fr 0.6fr 0.5fr 3rem '
    gap = '1rem'
  } else if (screen === 'mobile') {
    columns = '7rem 2fr 0.6fr 3rem '
    gap = '1rem'
  }
  return (
    // <Table columns="7rem 2fr 0.7fr 0.7fr 3rem ">
    <Table gap={gap} columns={columns}>
      <Table.Header>
        <div></div>
        <div>{screen === 'desktop' ? 'Title' : 'Post'}</div>
        {screen === 'desktop' && <div>category</div>}
        {screen !== 'mobile' && <div>date</div>}
        <div>stats</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={posts}
        render={(post) => (
          <DashboardRow
            key={post._id}
            ref={menuRef}
            isMenuOpen={selectedId === post._id}
            openMenu={() =>
              setSelectedId((current) =>
                current === post._id ? null : post._id,
              )
            }
            closeMenu={() => setSelectedId(null)}
            post={post}
            screen={screen}
          />
        )}
      />
      <Modal.Window window={selectedId}>
        <ConfirmDelete
          resourceName={'post'}
          disabled={isDeleting}
          onCloseModal={() => setSelectedId(null)}
          onConfirm={() =>
            deletePost(selectedId, {
              onSettled: () => {
                closeWindow()
                setSelectedId(null)
              },
            })
          }
        />
      </Modal.Window>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  )
}

export default DashboardTable
