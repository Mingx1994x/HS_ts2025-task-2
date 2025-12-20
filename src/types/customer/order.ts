import type { TPagination } from '../product'

export type TOrder = {
  create_at: number
  id: string
  is_paid: boolean
  message: string
  products: TOrderProduct[]
  user: TOrderUser
  num: number
}

export type TOrderProduct = {
  id: string
  product_id: string
  qty: string
}

export type TOrderUser = {
  address: string
  email: string
  name: string
  tel: string
}

export type TGetOrdersResponse = {
  success: boolean
  orders: TOrder[]
  pagination: TPagination
  messages: unknown[]
}

export type TPostOrderParams = {
  user: TOrderUser
  message: string
}

export type TPostOrderResponse = {
  success: boolean
  message: string
  total: number
  create_at: number
  orderId: string
}
