import axios from 'axios'
import { serverUrl, config } from '../utils/constants'
export const getPostComments = async ({ post, page, pageSize }) => {
  let queries = `post=${post}`
  if (page) queries += `&page=${page}&pageSize=${pageSize}`
  const res = await axios.get(
    `${serverUrl}/comments/getPostComments?${queries}`,
    config,
  )
  return res?.data?.data
}
export const addComment = async ({ post, comment }) => {
  const res = await axios.post(
    `${serverUrl}/comments/addComment?post=${post}`,
    { comment },
    config,
  )
  console.log(res)
  return res?.data?.data
}
export const deleteComment = async (comment) => {
  const res = await axios.delete(
    `${serverUrl}/comments/deleteComment?comment=${comment}`,
    config,
  )
  return res?.data?.data
}
export const updateComment = async ({ comment, newComment }) => {
  const res = await axios.patch(
    `${serverUrl}/comments/updateComment?comment=${comment}`,
    {
      comment: newComment,
    },
    config,
  )
  return res?.data?.data
}
