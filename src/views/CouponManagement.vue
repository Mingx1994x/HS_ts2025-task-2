<script setup lang="ts">
import { apiCreateCoupon, apiEditCoupon, apiGetCoupons } from '@/api/coupon'
import type { TCouponData, TCouponDetail } from '@/types/coupon'
import { Modal } from 'bootstrap'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

const coupons=ref<TCouponDetail[]>([])
const currentPage = ref<string>('1')
const isLoading=ref<boolean>(false)
// 取得優惠券
const getCoupons = async () => {
  isLoading.value=true
  try {
    const res = await apiGetCoupons({
      page: currentPage.value,
    })
    console.log("取得優惠券成功",res);
    coupons.value=res.data.coupons
  } catch (error) {
    console.error(error)
    alert('取得優惠券失敗，請稍後再試')
  }finally{
    isLoading.value=false
  }
}

// 刪除優惠券
// 編輯優惠券
const editCoupon=async()=>{
  try {
    const {id,title,is_enabled,percent,due_date,code}=tempCoupon.value
    const res=await apiEditCoupon({
      id,
      data:{
        title,
        is_enabled,
        percent,
        due_date,
        code
      }
    })
    console.log("更新優惠券成功",res);
  } catch (error) {
    console.error(error);
    alert('更新優惠券失敗，請稍後再試')
  }
}

onMounted(() => {
  getCoupons()
})

const getInitialCoupon=():TCouponDetail=>({
  id:'',
  title:'',
  is_enabled:0,
  percent:0,
  due_date:new Date().getTime()+60*60*24*1000,
  code:'',
  num:0
})

const tempCoupon=ref<TCouponDetail>(getInitialCoupon());
const dueDate = computed({
  get(): string {
    if (!tempCoupon.value.due_date) return ''
    
    const date = new Date(tempCoupon.value.due_date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  },
  set(value: string) {
    if (!value) {
      tempCoupon.value.due_date = Date.now()
      return
    }
    
    // 使用本地時區建立日期
    const [year, month, day] = value.split('-').map(Number)
    const date = new Date(year, month - 1, day, 0, 0, 0, 0)
    tempCoupon.value.due_date = date.getTime()
  },
})

// 開啟優惠券 Modal
let modal:Modal | null=null
const modalRef=useTemplateRef('modalRef')
const openModal=()=>{
  if(modal){
    modal.show()
  }
}

const closeModal=()=>{
  if(modal){
    modal.hide()
  }
}

onMounted(()=>{
  if(modalRef.value){
    modal=new Modal(modalRef.value)
  }
})

onUnmounted(() => {
  if (modal) {
    modal.dispose()
  }
})

type TFunctionMode= "create" | "edit"
const functionMode=ref<TFunctionMode>("create")
const openCouponModal=(coupon:TCouponDetail|null=null)=>{
  
  if(coupon){
    tempCoupon.value={...coupon}
    functionMode.value='edit'
  }else{
    tempCoupon.value=getInitialCoupon()
  }
  
  openModal()
}

// 新增優惠券
const createCoupon=async(CouponData:TCouponData)=>{
  try {
    const res=await apiCreateCoupon(CouponData)
    console.log("新增優惠券成功",res);
  } catch (error) {
    console.error(error);
    alert('新增優惠券失敗，請稍後再試')
  }
}

const handleSubmitCoupon=async(mode:TFunctionMode)=>{
  if(mode==="create"){
    await createCoupon(tempCoupon.value)
  } else{
    await editCoupon()
  }
  closeModal()
  getCoupons()
}
</script>
<template>
  <div class="d-flex justify-content-end align-items-center mb-4">
    <button type="button" class="btn btn-dark rounded-lg px-4 py-2" @click="openCouponModal(null)">
      <i class="fas fa-plus me-2"></i>新增優惠券
    </button>
  </div>
  <!-- 優惠券 Table -->
   <div class="card shadow-sm rounded-lg flex-grow-1">
    <div class="card-body p-4">
      <div class="table-responsive" v-if="!isLoading">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">優惠券名稱</th>
              <th scope="col">優惠券碼</th>
              <th scope="col">優惠折扣</th>
              <th scope="col">到期日期</th>
              <th scope="col" class="text-center">啟用</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.id">
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.code }}</td>
              <td>{{ `${coupon.percent}%`}}</td>
              <td>{{ new Date(coupon.due_date).toLocaleDateString()}}</td>
              <td class="text-center">
                <div
                  class="form-check form-switch d-flex justify-content-center align-items-center"
                >
                  <input
                    readonly
                    class="form-check-input"
                    style="pointer-events: none"
                    type="checkbox"
                    id="flexSwitchCheckDefault1"
                    :checked="Boolean(coupon.is_enabled)"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-dark rounded-lg me-2"
                  @click="openCouponModal(coupon)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger rounded-lg"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-else
        class="d-flex justify-content-center align-items-center"
        style="height: calc(100vh - 98px)"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
   <!-- 優惠券 Modal -->
    <div
    ref="modalRef"
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content rounded-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="couponModalLabel">新增優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="couponTitle" class="form-label">優惠券標題</label>
              <input
                type="text"
                class="form-control rounded-lg"
                id="couponTitle"
                placeholder="例如：新會員專屬折扣"
                v-model="tempCoupon.title"
              />
            </div>
            <div class="mb-3">
              <label for="couponCode" class="form-label">優惠碼</label>
              <input
                type="text"
                class="form-control rounded-lg"
                id="couponCode"
                placeholder="例如：NEW2024"
                v-model="tempCoupon.code"
              />
            </div>
            <div class="mb-3">
              <label for="couponDiscount" class="form-label">折扣</label>
              <input
                type="number"
                max="100"
                min="0"
                class="form-control rounded-lg"
                id="couponDiscount"
                placeholder="例如：90 代表 9 折"
                v-model="tempCoupon.percent"
              />
            </div>
            <div class="mb-3">
              <label for="couponEndDate" class="form-label">截止日</label>
              <input
                type="date"
                class="form-control rounded-lg"
                id="couponEndDate"
                v-model="dueDate"
              />
            </div>
            <div class="mb-3 d-flex align-items-center">
              <label class="form-label me-3 mb-0">啟用</label>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCouponEnable"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary rounded-lg"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="functionMode==='create'"
            type="button"
            class="btn btn-dark rounded-lg"
            @click="handleSubmitCoupon('create')"
          >
            新增
          </button>
          <button
            v-else
            type="button"
            class="btn btn-dark rounded-lg"
            @click="handleSubmitCoupon('edit')"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
