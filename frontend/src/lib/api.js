import axios from "axios"
import { useAuth } from "../store/auth"

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" })

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// A 401 on an authenticated call means the token expired -> drop the session.
api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401 && useAuth.getState().token) useAuth.getState().logout()
    return Promise.reject(error)
  }
)

/** Pulls the backend's { data: { message } } error text, with a fallback. */
export const errorMessage = (error, fallback = "Something went wrong. Please try again.") =>
  error?.response?.data?.data?.message || (error?.request && !error.response ? "Cannot reach the server." : fallback)

export const unwrap = (res) => res.data.data
