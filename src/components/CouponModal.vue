<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { Modal } from 'bootstrap';

import { apiCreateCoupon, apiEditCoupon } from '@/api/coupon';

import type {TCouponData, TCouponDetail} from '../types/coupon'

interface CouponModalProps {
  coupon:TCouponDetail
  functionMode:TFunctionMode
}
const props = defineProps<CouponModalProps>()

const tempCoupon=ref(props.coupon)
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

watch(
  [() => props.coupon, () => props.functionMode],
  ([newCoupon]) => {
    tempCoupon.value = { ...newCoupon }
  }
)

const emit = defineEmits(['get-coupons'])

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

defineExpose({
  openModal,
  closeModal,
})

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

type TFunctionMode= "create" | "edit"
const handleSubmitCoupon=async(mode:TFunctionMode)=>{
  if(mode==="create"){
    await createCoupon(tempCoupon.value)
  } else{
    await editCoupon()
  }
  closeModal()
  emit('get-coupons')
}
</script>
<template>
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
          <h5 class="modal-title" id="couponModalLabel">{{ props.functionMode === 'create' ? '新增優惠券' : '編輯優惠券' }}</h5>
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
            v-if="props.functionMode==='create'"
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