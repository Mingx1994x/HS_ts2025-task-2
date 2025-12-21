<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { apiDeleteCoupon, apiGetCoupons } from '@/api/coupon'
import CouponModal from '@/components/CouponModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import LayoutPagination from '@/components/LayoutPagination.vue'
import type { TCouponDetail } from '@/types/coupon'
import type { TPagination } from '@/types/product'

const coupons = ref<TCouponDetail[]>([])
const currentPage = ref<string>('1')
const pagination = ref<TPagination>({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false,
  category: '',
})
const isLoading = ref<boolean>(false)
// 取得優惠券
const getCoupons = async () => {
  isLoading.value = true
  try {
    const res = await apiGetCoupons({
      page: currentPage.value,
    })
    coupons.value = res.data.coupons
    pagination.value = res.data.pagination
  } catch (error) {
    alert('取得優惠券失敗，請稍後再試')
  } finally {
    isLoading.value = false
  }
}

const handlePagination = (page: string) => {
  currentPage.value = page
  getCoupons()
}

onMounted(() => {
  getCoupons()
})

const getInitialCoupon = (): TCouponDetail => ({
  id: '',
  title: '',
  is_enabled: 0,
  percent: 0,
  due_date: new Date().getTime() + 60 * 60 * 24 * 1000,
  code: '',
  num: 0,
})

const tempCoupon = ref<TCouponDetail>(getInitialCoupon())

const couponModal = useTemplateRef<InstanceType<typeof CouponModal>>('couponModalRef')
const couponDeleteModal = useTemplateRef<InstanceType<typeof DeleteModal>>('couponDeleteModalRef')

type TFunctionMode = 'create' | 'edit'
const functionMode = ref<TFunctionMode>('create')
const openCouponModal = (coupon: TCouponDetail | null = null) => {
  if (coupon) {
    tempCoupon.value = { ...coupon }
    functionMode.value = 'edit'
  } else {
    tempCoupon.value = getInitialCoupon()
    functionMode.value = 'create'
  }

  // openModal()
  couponModal.value?.openModal()
}

const openDeleteModal = (id: string) => {
  couponDeleteModal.value?.openModal(() => deleteCoupon(id))
}

const deleteCoupon = async (id: string) => {
  try {
    await apiDeleteCoupon(id)
  } catch (error) {
    alert('刪除失敗，請稍後再試')
  } finally {
    getCoupons()
  }
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
              <td>{{ `${coupon.percent}%` }}</td>
              <td>{{ new Date(coupon.due_date).toLocaleDateString() }}</td>
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
                  @click="openDeleteModal(coupon.id)"
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
    <LayoutPagination :pagination="pagination" @handle-pagination="handlePagination" />
  </div>
  <!-- 優惠券 Modal -->
  <CouponModal
    ref="couponModalRef"
    :coupon="tempCoupon"
    :function-mode="functionMode"
    @get-coupons="getCoupons"
  />
  <DeleteModal ref="couponDeleteModalRef" title="刪除優惠券" content="確定要刪除優惠券嗎？" />
</template>
