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

  console.log(isLoading, count, posts)
  if (isLoading)
    return (
      <SpinnerWrapper>
        <Spinner size="4rem" />
      </SpinnerWrapper>
    )

  return (
    <Table columns="7rem 2fr 1fr 0.7fr 0.7fr 3rem ">
      <Table.Header>
        <div></div>
        <div>title</div>
        <div>category</div>
        <div>date</div>
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
