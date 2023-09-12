import axios from "axios"
import { serverUrl } from "../utils/constants"
import { config } from "../utils/constants"

export async function addNewPost({ categorie, coverImg, title, content }) {
  const res = await axios.post(
    `${serverUrl}/posts/addNewPost`,
    {
      categorie,
      coverImg,
      title,
      content
    },
    config
  )
  console.log(res)
}
export async function getPosts() {
  const res = await axios.get(`${serverUrl}/posts`, config)
  return res.data?.data?.posts
}
