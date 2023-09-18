import axios from "axios"
import { serverUrl } from "../utils/constants"
import { config } from "../utils/constants"

export const getPost = async (postId) => {
  const res = await axios.get(`${serverUrl}/posts/${postId}`, config)
  return res.data?.data?.post
}

export const addNewPost = async (data) =>
  await axios.post(`${serverUrl}/posts/addNewPost`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    withCredentials: true
  })

export async function getPosts({ search, category, page, pageSize }) {
  const res = await axios.get(
    `${serverUrl}/posts?search=${search}&category=${category}&page=${page}&pageSize=${pageSize}`,
    config
  )
  return res.data?.data
}
