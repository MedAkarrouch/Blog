import axios from 'axios'
import { config, serverUrl } from '../utils/constants'

const server = `${serverUrl}/likes`

export const addLike = async ({ post }) =>
  await axios.post(`${server}/addLike?post=${post}`, {}, config)

export const removeLike = async ({ post }) =>
  await axios.delete(`${server}/removeLike?post=${post}`, config)
