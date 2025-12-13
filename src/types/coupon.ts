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

export type TCouponDetail=TCouponData & {
  id:string,
  num:number,
}

export type TGetCouponResponse={
  success:boolean,
  coupons:TCouponDetail[],
  pagination:TPagination,
  messages:unknown[]
}