import axios from 'axios'
import { serverUrl } from '../utils/constants'
import { config } from '../utils/constants'

export async function signup({ username, email, password, passwordConfirm }) {
  const res = await axios.post(
    `${serverUrl}/auth/signup`,
    {
      username,
      email,
      password,
      passwordConfirm,
    },
    config,
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
    config,
  )
  return res.data.data.user
}
export const logout = async () =>
  await axios.get(`${serverUrl}/auth/logout`, config)

export const updateMe = async (data) =>
  await axios.patch(`${serverUrl}/users/updateMe`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })

export const updatePassword = async (data) =>
  await axios.patch(`${serverUrl}/users/updatePassword`, data, config)

export const deleteMe = async (data) =>
  await axios.post(`${serverUrl}/users/deleteMe`, data, config)
