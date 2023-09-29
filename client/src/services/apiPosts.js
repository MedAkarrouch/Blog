import axios from 'axios'
import { serverUrl } from '../utils/constants'
import { config } from '../utils/constants'

export const getPost = async (postId) => {
  // const res = await axios.get(`${serverUrl}/posts/${postId}`, config)
  const res = await axios.get(
    `${serverUrl}/posts/getPost?post=${postId}`,
    config,
  )
  return res.data?.data?.post
}

export const addNewPost = async (data) =>
  await axios.post(`${serverUrl}/posts/addNewPost`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })

export async function getPosts({ search, category, page, pageSize }) {
  const res = await axios.get(
    `${serverUrl}/posts?search=${search}&category=${category}&page=${page}&pageSize=${pageSize}`,
    config,
  )
  return res.data?.data
}

export const likePost = async (post) => {
  const res = await axios.get(`${serverUrl}/posts/addLike?post=${post}`, config)
  return res.data?.data?.post
}

export const commentOnPost = async ({ post, comment }) => {
  const res = await axios.post(
    `${serverUrl}/posts/addComment?post=${post}`,
    { comment },
    config,
  )
  return res.data?.data?.post
}
export const deleteComment = async (post) => {
  const res = await axios.delete(
    `${serverUrl}/posts/deleteComment?post=${post}`,
    config,
  )
  return res.data?.data?.post
}
export const editComment = async ({ post, comment }) => {
  const res = await axios.patch(
    `${serverUrl}/posts/updateComment?post=${post}`,
    { comment },
    config,
  )
  return res.data?.data?.post
}
