<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProductsAll } from '@/api/customerProducts'
import { pickRandomItemsByCategory } from '@/utils/dataProcess'

import ProductCard from '@/components/ProductCard.vue'

import type { TProduct } from '@/types/customer/product'

const selectedProducts = ref<TProduct[]>([])

const getSelectProducts = async () => {
  try {
    const res = await getProductsAll()
    console.log(res)
    selectedProducts.value = pickRandomItemsByCategory(res.data.products, 3)
    console.log('精選', selectedProducts.value)
  } catch (error) {
    console.error(error)
    alert('取得商品失敗')
  }
}

onMounted(() => {
  getSelectProducts()
})
</script>
<template>
  <section id="product-section" class="product-section container">
    <div class="text-center mb-5">
      <h2 class="section-title text-uppercase mb-3">精選商品</h2>
      <p class="text-neutral">我們為您挑選了最具神秘風格的獨特單品。</p>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in selectedProducts" :key="product.id">
        <ProductCard v-bind="product" variant="intro" />
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.product {
  &-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}
</style>
