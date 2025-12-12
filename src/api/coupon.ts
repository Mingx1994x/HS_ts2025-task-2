import { hexStoreApi } from "./interceptors";

import type { AxiosResponse } from "axios";
import type { TCouponData, TCreateCouponResponse, TDeleteCouponResponse, TEditCouponParam, TEditCouponResponse, TGetCouponResponse } from "@/types/coupon";

const API_PATH = import.meta.env.VITE_API_PATH

export const apiCreateCoupon=(data:TCouponData):Promise<AxiosResponse<TCreateCouponResponse>>=> hexStoreApi.post(`/v2/api/${API_PATH}/admin/coupon`,{data})


export const apiEditCoupon=(params:TEditCouponParam):Promise<AxiosResponse<TEditCouponResponse>>=>{
  const {id,data}=params
  return hexStoreApi.put(`/v2/api/${API_PATH}/admin/coupon/${id}`,{data})
}

export const apiDeleteCoupon=(id:string):Promise<AxiosResponse<TDeleteCouponResponse>>=>hexStoreApi.delete(`/v2/api/${API_PATH}/admin/coupon/${id}`)

export const apiGetCoupons=(params:{page?:string}):Promise<AxiosResponse<TGetCouponResponse>>=> hexStoreApi.get(`/v2/api/${API_PATH}/admin/coupons`,{
    params
  })
