<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProducts, getProductsCategories } from '@/api/customerProducts'

import LayoutPagination from '@/components/LayoutPagination.vue'
import ProductCard from '@/components/ProductCard.vue'

import type { TProduct } from '@/types/customer/product'
import type { TPagination } from '@/types/product'

const productList = ref<TProduct[]>([])
const categoryList = ref<string[]>()
const currentPage = ref<string>('1')
const currentCategory = ref<string>('')
const pagination = ref<TPagination>({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false,
  category: '',
})

const getProductList = async () => {
  try {
    const res = await getProducts({
      page: currentPage.value,
      category: currentCategory.value,
    })
    productList.value = res.data.products
    pagination.value = res.data.pagination
  } catch (error) {
    console.error(error)
    alert('取得商品失敗')
  }
}

const handlePagination = (page: string) => {
  currentPage.value = page
  getProductList()
}

const handleSwitchCategory = (category: string) => {
  // currentPage.value='1'
  currentCategory.value = category
  getProductList()
}

onMounted(async () => {
  await getProductList()
  categoryList.value = getProductsCategories(productList.value)
})
</script>
<template>
  <div
    class="position-relative d-flex align-items-center justify-content-center product-list-hero"
    style="min-height: 482px"
  >
    <div
      class="position-absolute"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(https://images.unsplash.com/photo-1507643179773-3e975d7ac515?auto=format&fit=crop&q=80&w=1350);
        background-position: center center;
        background-size: cover;
        opacity: 0.2;
      "
    ></div>
    <div class="text-center position-relative">
      <h2 class="fw-bold text-uppercase mb-2">珍品裝備庫</h2>
      <p class="text-neutral">Masks & Collections</p>
    </div>
  </div>
  <div class="container mt-md-5 mt-4 mb-5">
    <div class="row">
      <div class="col-md-3 category-sidebar mb-4">
        <div class="card border-0">
          <div class="card-header px-0 py-3">
            <div class="d-flex justify-content-between align-items-center px-3">
              <h4 class="mb-0 fs-5 text-uppercase">面具分類</h4>
              <i class="fas fa-filter text-primary"></i>
            </div>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0">
              <li>
                <a
                  role="button"
                  class="nav-link-item d-block"
                  :class="`${currentCategory === '' ? 'active' : ''}`"
                  :disabled="`${currentCategory === '' ? true : false}`"
                  @click="handleSwitchCategory('')"
                >
                  所有珍品
                </a>
              </li>
              <li v-for="category in categoryList" :key="category">
                <a
                  role="button"
                  class="nav-link-item d-block"
                  :class="`${currentCategory === category ? 'active' : ''}`"
                  :disabled="`${currentCategory === category ? true : false}`"
                  @click="handleSwitchCategory(category)"
                  >{{ category }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-9">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="product in productList" :key="product.id">
            <ProductCard v-bind="product" />
          </div>
        </div>

        <LayoutPagination :pagination="pagination" @handle-pagination="handlePagination" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
/* 分類側欄樣式 */
.category-sidebar .card {
  background-color: #211238;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-sidebar .card-header {
  background-color: transparent !important;
  border-bottom: 1px solid rgba(255, 183, 3, 0.2);
  cursor: default;
  /* 因為禁用 JS，我們先預設它是展開狀態 */
}

.category-sidebar .nav-link-item {
  color: var(--bs-neutral);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.category-sidebar .nav-link-item:hover,
.category-sidebar .nav-link-item.active {
  background-color: rgba(255, 183, 3, 0.1);
  color: var(--bs-primary);
  padding-left: 1.5rem;
}
</style>
