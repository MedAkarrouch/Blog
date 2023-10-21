import { cloneElement, useMemo } from 'react'
import { useUser } from '../auth/useUser'
import SpinnerMini from '../../ui/SpinnerMini'
import { HiOutlineBookmark, HiOutlineHeart } from 'react-icons/hi2'
import { useAddPosttoReadingList } from './useAddPostToReadingList'
import { useRemovePostFromReadingList } from './useRemovePostFromReadingList'
import { useReadingList } from './useReadingList'

function AddToReadingListButton({ post, children }) {
  const { isAuthenticated, user } = useUser()
  const { readingList, count, isLoading: isLoading1 } = useReadingList()
  const { addPostToReadingList, isLoading: isLoading2 } =
    useAddPosttoReadingList()
  const { removePostFromReadingList, isLoading: isLoading3 } =
    useRemovePostFromReadingList()
  const isLoading = isLoading1 || isLoading2 || isLoading3
  console.log('Reading-list : ', readingList)
  const hasUserAlreadyAddedPostToReadingList = useMemo(() => {
    return readingList?.some((item) => item.user === user?._id)
  }, [count, isAuthenticated])

  const handleLick = () => {
    if (!isAuthenticated) return
    if (hasUserAlreadyAddedPostToReadingList)
      removePostFromReadingList({ post: post._id })
    else if (!hasUserAlreadyAddedPostToReadingList)
      addPostToReadingList({ post: post._id })
  }

  return cloneElement(
    children,
    {
      title: hasUserAlreadyAddedPostToReadingList
        ? 'Remove from reading list'
        : 'Add to reading list',
      active: hasUserAlreadyAddedPostToReadingList ? 'true' : '',
      onClick: handleLick,
    },
    isLoading ? (
      <SpinnerMini color={'var(--color-orange-400)'} />
    ) : (
      <HiOutlineBookmark />
    ),
  )
}

export default AddToReadingListButton
