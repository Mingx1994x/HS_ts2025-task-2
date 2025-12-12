import axios from 'axios'

import { getToken } from '@/utils/auth'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const hexStoreApi = axios.create({
  baseURL: BASE_URL,
})

hexStoreApi.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers['Authorization'] = token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

hexStoreApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response.data)
  },
)