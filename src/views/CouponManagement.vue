<script setup lang="ts">
import { apiGetCoupons } from '@/api/coupon';
import { onMounted, ref } from 'vue';

  const currentPage = ref<string>('1')
  const getCoupons=async()=>{
    try {
      const res=await apiGetCoupons({
        page:currentPage.value
      })
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(()=>{
    getCoupons()
  })
</script>
<template>
  <div class="d-flex justify-content-end align-items-center mb-4">
    <button type="button" class="btn btn-dark rounded-lg px-4 py-2">
      <i class="fas fa-plus me-2"></i>新增優惠券
    </button>
  </div>
</template>