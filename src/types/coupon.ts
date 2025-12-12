import type { TPagination } from "./product";

export type TCouponData={
  title:      string;
  is_enabled: number;
  percent:    number;
  due_date:   number;
  code:       string;
}

export type TEditCouponParam={
  id:string,
  data:TCouponData
}

type TMessageResponse={
  success: boolean,
  message: string
}

export type TCreateCouponResponse=TMessageResponse
export type TDeleteCouponResponse=TMessageResponse
export type TEditCouponResponse=TMessageResponse

type TCoupon=Omit<TCouponData,'code'>

export type TGetCouponResponse={
  success:boolean,
  coupons:TCoupon[],
  pagination:TPagination,
  messages:unknown[]
}