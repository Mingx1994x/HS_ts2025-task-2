<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { getProductById, getProductsAll } from '@/api/customerProducts'
import { formatContent, pickRandomItemsByCategory } from '@/utils/dataProcess'

import ProductCard from '@/components/ProductCard.vue'
import ProductQuantityInput from '@/components/ProductQuantityInput.vue'

import type { TProduct, TProductContentFormat } from '@/types/customer/product'

const route = useRoute()
const contentData = ref<TProductContentFormat>({
  ability: '',
  rarity: 0,
  recommend: '',
})
const product = ref<TProduct>({
  id: '',
  category: '',
  content: '',
  description: '',
  imageUrl: '',
  imagesUrl: [],
  is_enabled: 0,
  num: 0,
  origin_price: 0,
  price: 0,
  title: '',
  unit: '',
})

const otherProducts = ref<TProduct[]>([])

const getProduct = async () => {
  const { id } = route.params
  try {
    const res = await getProductById(id as string)
    product.value = res.data.product
    const { content } = res.data.product
    contentData.value = formatContent(content)
  } catch (error) {
    alert('取得商品資料錯誤')
  }
}

const getOtherProducts = async () => {
  try {
    const res = await getProductsAll()
    const { products: allProducts } = res.data
    const restProduct = allProducts.filter((item) => item.id !== product.value.id)
    otherProducts.value = pickRandomItemsByCategory(restProduct, 4)
  } catch (error) {
    alert('取得其他商品資料錯誤')
  }
}

const statConfig = ref<
  Array<{
    key: TProductContentFormatKey
    label: string
  }>
>([
  { key: 'ability', label: '加護能力' },
  { key: 'rarity', label: '稀有度' },
  { key: 'recommend', label: '建議場合' },
])

type TProductContentFormatKey = keyof TProductContentFormat
const renderContentData = (key: TProductContentFormatKey): string => {
  if (key === 'rarity') return '★'.repeat(contentData.value.rarity)
  return contentData.value[key]
}

const quantityInput =
  useTemplateRef<InstanceType<typeof ProductQuantityInput>>('productQuantityInputRef')

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await getProduct()
      quantityInput.value?.initialQty()
      getOtherProducts()
    }
  },
  { immediate: true },
)

// 購物車 pinia
const cartStore = useCartStore()
const { addCart } = cartStore

const purchaseQty = ref<number>(1)
function getQuantity(qty: number) {
  purchaseQty.value = qty
}

function handleAddToCart() {
  try {
    addCart(product.value, purchaseQty.value)
    quantityInput.value?.initialQty()
    alert('加入購物車成功')
  } catch (error) {
    alert(error instanceof Error ? error.message : '加入裝備失敗,請稍後再試')
  }
}
</script>
<template>
  <div class="container pb-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent px-0 py-4">
        <li class="breadcrumb-item"><RouterLink to="/">首頁</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/products">珍品裝備庫</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>

    <div class="row align-items-start g-5">
      <div class="col-md-7">
        <div class="detail-image-container">
          <img
            :src="product.imageUrl"
            class="d-block w-100 object-fit-cover"
            :alt="`${product.title}-主圖`"
            style="aspect-ratio: 4/3"
          />
        </div>
      </div>

      <div class="col-md-5">
        <div class="product-header-box">
          <span class="badge bg-primary text-dark mb-2 text-uppercase">{{ product.category }}</span>
          <h2 class="fw-bold h1 mb-3">
            {{ product.title }}
          </h2>

          <div class="price-box mb-4">
            <p class="mb-0 text-neutral">
              <del>{{ `原價：NT$ ${product.origin_price.toLocaleString()}` }}</del>
            </p>
            <div class="d-flex justify-content-between">
              <p class="h2 fw-bold text-primary">{{ `NT$ ${product.price.toLocaleString()}` }}</p>
              <p class="text-neutral">
                剩餘 <span class="h3 fw-bold text-primary">{{ product.num }}</span>
                {{ product.unit }}
              </p>
            </div>
          </div>

          <ul class="stats-box list-unstyled mb-4">
            <li class="stat-item" v-for="state in statConfig" :key="state.key">
              <span class="stat-label">{{ state.label }}</span>
              <span class="stat-value">{{ renderContentData(state.key) }}</span>
            </li>
          </ul>

          <div class="buy-action-box">
            <div class="row g-2 align-items-center">
              <div class="col-6">
                <ProductQuantityInput
                  ref="productQuantityInputRef"
                  :product-nums="product.num"
                  :product-id="product.id"
                  @emit-quantity="getQuantity"
                />
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-primary w-100 py-2 text-uppercase fw-bold"
                  @click="handleAddToCart"
                >
                  加入裝備袋
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-5">
      <div class="col-md-8">
        <h3 class="related-title text-uppercase">道具秘辛</h3>
        <p class="about-description">
          {{ product.description }}
        </p>
      </div>
    </div>

    <h3 class="related-title text-uppercase mt-5">猜你想再多看看...</h3>
    <ul class="row row-cols-2 row-cols-md-4 g-4 mt-2 list-unstyled">
      <li class="col" v-for="otherProduct in otherProducts" :key="otherProduct.id">
        <ProductCard v-bind="otherProduct" variant="compact" />
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.breadcrumb-item + .breadcrumb-item::before {
  color: var(--bs-neutral);
}

.breadcrumb-item {
  a {
    color: var(--bs-neutral);
  }

  &.active {
    color: var(--bs-primary);
  }
}

.detail-image-container {
  border: 1px solid rgba(255, 183, 3, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background-color: #000;
}

/* 遊戲道具屬性區 */
.stats-box {
  background-color: rgba(255, 255, 255, 0.03);
  border-left: 3px solid var(--bs-primary);
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
}

.stat-label {
  color: var(--bs-neutral);
  font-size: 0.9rem;
}

.stat-value {
  color: var(--bs-primary);
  font-weight: bold;
}

/* 數量選擇器自定義樣式 */
// .quantity-input-group .form-control {
//   background-color: #211238;
//   border-color: rgba(255, 183, 3, 0.3);
//   color: var(--bs-primary);
// }

// .quantity-input-group .btn {
//   border-color: rgba(255, 183, 3, 0.3);
//   color: var(--bs-primary);
// }

// .quantity-input-group .btn:hover {
//   background-color: var(--bs-primary);
//   color: var(--bs-dark);
// }

/* 推薦商品標題 */
.related-title {
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.related-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: var(--bs-primary);
}
</style>
