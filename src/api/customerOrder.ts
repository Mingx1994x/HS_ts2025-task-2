import axios from 'axios'

import type { TGetOrdersResponse, TPostOrderParams } from '@/types/customer/order'
import type { AxiosResponse } from 'axios'

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env

export const hexStoreApi = axios.create({
  baseURL: VITE_BASE_URL,
})

// 客戶取得購物訂單
export const getCustomerOrders = (params: {
  page?: string
}): Promise<AxiosResponse<TGetOrdersResponse>> =>
  hexStoreApi.get(`/v2/api/${VITE_API_PATH}/orders`, { params })

// 客戶新增購物訂單
export const createCustomerOrder = (data: TPostOrderParams) =>
  hexStoreApi.post(`/v2/api/${VITE_API_PATH}/order`, { data })
