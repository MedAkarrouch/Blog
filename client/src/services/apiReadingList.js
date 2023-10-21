import axios from 'axios'
import { config, serverUrl } from '../utils/constants'

const server = `${serverUrl}/readingLists`

export const getReadingList = async () => {
  const res = await axios.get(`${server}/`, config)
  return res?.data?.data
}

export const addPostToReadingList = async ({ post }) =>
  await axios.post(`${server}/addToReadingList?post=${post}`, {}, config)

export const removePostFromReadingList = async ({ post }) =>
  await axios.delete(`${server}/removePostFromReadingList?post=${post}`, config)
