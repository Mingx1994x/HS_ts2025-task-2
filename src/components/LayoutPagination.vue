<script setup lang="ts">
import type { TPagination } from '@/types/product'
import { ref } from 'vue'

interface IPaginationProp{
  pagination:TPagination;
}
const {pagination}=defineProps<IPaginationProp>()

const emit = defineEmits(['handle-pagination'])

// 頁面切換
const currentPage = ref<string>('1')
const handlePagination=(page:number)=>{
  currentPage.value=String(page)
  // getProducts()
  emit('handle-pagination',currentPage.value)
}

</script>
<template>
  <nav class="d-flex justify-content-center mt-4">
        <ul class="pagination">
          <li class="page-item">
            <button
              @click="handlePagination(Number(currentPage) - 1)"
              :disabled="!pagination?.has_pre"
              type="button"
              class="page-link"
              :class="{ disabled: !pagination?.has_pre }"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="pageNum in pagination?.total_pages" class="page-item" :key="pageNum">
            <button
              @click="handlePagination(pageNum)"
              :disabled="currentPage === pageNum.toString()"
              type="button"
              class="page-link"
              :class="{ active: currentPage === pageNum.toString() }"
            >
              {{ pageNum }}
            </button>
          </li>
          <li class="page-item">
            <button
              @click="handlePagination(Number(currentPage) + 1)"
              :disabled="!pagination?.has_next"
              class="page-link"
              :class="{ disabled: !pagination?.has_next }"
              type="button"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
</template>