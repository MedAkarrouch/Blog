import axios from 'axios'
import { serverUrl } from '../utils/constants'
import { config } from '../utils/constants'

const server = `${serverUrl}/posts`

export const getPost = async ({ postId, commentsPage }) => {
  // const res = await axios.get(`${serverUrl}/posts/${postId}`, config)
  const res = await axios.get(
    `${serverUrl}/posts/getPost?post=${postId}&commentsPage=${commentsPage}`,
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

// export const updatePost = async (post, data) =>
// await axios.post(`${server}/updatePost?post=${post}`, data, config)
export const updatePost = async (post, data) =>
  await axios.post(`${server}/updatePost?post=${post}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })

export async function getPosts({ search, category, page, pageSize, sortBy }) {
  const res = await axios.get(
    `${serverUrl}/posts?search=${search}&category=${category}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`,
    config,
  )
  return res.data?.data
}

export const likePost = async (post) => {
  const res = await axios.get(`${serverUrl}/posts/addLike?post=${post}`, config)
  return res.data?.data?.post
}

export const getUserPosts = async ({ page, pageSize }) => {
  const res = await axios.get(
    `${serverUrl}/posts/getUserPosts?page=${page}&pageSize=${pageSize}`,
    config,
  )
  console.log(res)
  return res?.data?.data
}
export const deletePost = async (post) => {
  const res = await axios.delete(
    `${serverUrl}/posts/deletePost?post=${post}`,
    config,
  )
  return res
}
