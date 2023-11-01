import { cloneElement, useMemo } from 'react'
import { useUser } from '../features/auth/useUser'
import { useAddLike } from '../features/likes/useAddLike'
import { useRemoveLike } from '../features/likes/useRemoveLike'
import SpinnerMini from './SpinnerMini'
import { HiOutlineHeart } from 'react-icons/hi2'

function LikeButton({ post, children }) {
  const { isAuthenticated, user } = useUser()
  const { likes, likesCount } = post
  const { addLike, isAddingLike } = useAddLike()
  const { removeLike, isRemovingLike } = useRemoveLike()
  const isLoading = isAddingLike || isRemovingLike

  const hasUserAlreadyLikedPost = useMemo(() => {
    return likes?.some((like) => like.user === user?._id)
  }, [likesCount, isAuthenticated, user?._id])

  const handleLikeClick = () => {
    if (!isAuthenticated) return
    if (hasUserAlreadyLikedPost) removeLike()
    else if (!hasUserAlreadyLikedPost) addLike()
  }

  return cloneElement(
    children,
    {
      title: hasUserAlreadyLikedPost ? 'Remove like' : 'Like this article',
      active: hasUserAlreadyLikedPost ? 'true' : '',
      onClick: handleLikeClick,
    },
    isLoading ? (
      <SpinnerMini color={'var(--color-orange-400)'} />
    ) : (
      <HiOutlineHeart />
    ),
  )
}

export default LikeButton
