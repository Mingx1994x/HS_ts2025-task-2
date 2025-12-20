import axios from 'axios'

import type { AxiosResponse } from 'axios'
import type {
  TGetProductsResponse,
  TGetProductByIdResponse,
  TGetProductsAllResponse,
  TProduct,
} from '@/types/customer/product'

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env

export const hexStoreApi = axios.create({
  baseURL: VITE_BASE_URL,
})

export const getProductsAll = (): Promise<AxiosResponse<TGetProductsAllResponse>> =>
  hexStoreApi.get(`/v2/api/${VITE_API_PATH}/products/all`)

export const getProducts = (params: {
  page?: string
  category?: string
}): Promise<AxiosResponse<TGetProductsResponse>> =>
  hexStoreApi.get(`/v2/api/${VITE_API_PATH}/products`, { params })

export const getProductById = (id: string): Promise<AxiosResponse<TGetProductByIdResponse>> =>
  hexStoreApi.get(`/v2/api/${VITE_API_PATH}/product/${id}`)

export function getProductsCategories(data: TProduct[]): string[] {
  return [...new Set(data.map((item) => item.category))]
}
