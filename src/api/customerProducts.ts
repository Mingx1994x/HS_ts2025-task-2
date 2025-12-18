import axios from "axios"

import type { AxiosResponse } from "axios"
import type { TGetProductsResponse,TGetProductByIdResponse } from "@/types/customer/product"

const {VITE_BASE_URL,VITE_API_PATH} =import.meta.env

export const hexStoreApi = axios.create({
  baseURL: VITE_BASE_URL,
})


export const getProductsAll=():Promise<AxiosResponse<TGetProductsResponse>>=>(hexStoreApi.get(`/v2/api/${VITE_API_PATH}/products/all`))

export const getProducts=(params:{page?:string,category?:string}):Promise<AxiosResponse<TGetProductsResponse>>=>(hexStoreApi.get(`/v2/api/${VITE_API_PATH}/products`,{params}))

export const getProductById=(id:string):Promise<AxiosResponse<TGetProductByIdResponse>>=>(hexStoreApi.get(`/v2/api/${VITE_API_PATH}/products/${id}`))

