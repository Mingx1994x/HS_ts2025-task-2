import type { TPagination } from '../product'

export type TProduct = {
  id: string
  category: string
  content: string
  description: string
  imageUrl: string
  imagesUrl: string[]
  is_enabled: number
  num: number
  origin_price: number
  price: number
  title: string
  unit: string
}

export type TProductContentFormat={
  ability:string;
  rarity:number;
  recommend:string;
}

type TResponse={
  success:boolean,
  message:unknown[]
}

export type TGetProductsAllResponse = TResponse & {
  products: TProduct[]
}

export type TGetProductsResponse = TGetProductsAllResponse & {
  pagination: TPagination
}

export type TGetProductByIdResponse = Omit<TResponse, 'message'> & {
  product: TProduct
}