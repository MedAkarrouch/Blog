import axios from "axios"
import { serverUrl } from "../utils/constants"
import { config } from "../utils/constants"

export async function signup({ fullName, email, password, passwordConfirm }) {
  const res = await axios.post(
    `${serverUrl}/auth/signup`,
    {
      fullName,
      email,
      password,
      passwordConfirm
    },
    config
  )
  return res.data.data.user
}

export async function getCurrentUser() {
  const res = await axios.get(`${serverUrl}/users/getMe`, config)
  return res.data.data.user
}
export async function login({ email, password }) {
  const res = await axios.post(
    `${serverUrl}/auth/login`,
    { email, password },
    config
  )
  return res.data.data.user
}
export async function logout() {}
export async function updatePassword() {}

export const updateMe = async (data) =>
  await axios.patch(`${serverUrl}/users/updateMe`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    withCredentials: true
  })
