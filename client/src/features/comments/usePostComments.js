import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPostComments } from '../../services/apiComments'

export function usePostComments() {
  const { postId: post } = useParams()
  const { isLoading, data: { totalComments, comments } = {} } = useQuery({
    queryKey: ['post-comments', post],
    queryFn: () => getPostComments({ post }),
  })
  return { isLoading, totalComments, comments }
}
