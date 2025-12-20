<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getProductsAll } from '@/api/customerProducts'
import { pickRandomItemsByCategory } from '@/utils/dataProcess'

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
        <div class="card h-100">
          <img
            :src="product.imageUrl"
            class="card-img-top object-fit-cover"
            :alt="product.title"
            loading="lazy"
            style="height: 300px"
          />
          <div class="card-body text-center d-flex flex-column">
            <h3 class="product-card-title text-uppercase">{{ product.title }}</h3>
            <p class="product-card-price text-primary my-2">
              {{ `NT$ ${product.price.toLocaleString()}` }}
            </p>
            <p class="card-text text-neutral">{{ product.description }}</p>
            <RouterLink
              :to="`/product-detail/${product.id}`"
              class="btn btn-primary btn-sm mt-auto align-self-center"
              >立即訂購</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.product {
  &-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  &-card-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  &-card-price {
    font-size: 1.5rem;
    // color: map-get($theme-colors, 'primary');
    font-weight: bold;
  }
}
</style>
