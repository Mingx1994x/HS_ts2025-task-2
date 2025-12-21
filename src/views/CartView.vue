<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import ProductQuantityInput from '@/components/ProductQuantityInput.vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const { cartItems, totalPrice, cartLength } = storeToRefs(cartStore)
const { removeCart, updateCart } = cartStore

function handleRemoveCarts(id: string) {
  if (confirm('確定要刪除此項裝備清單嗎?')) {
    // 使用者點擊確定後執行刪除
    removeCart(id)
  }
}

const purchaseQty = ref<number>(1)
const getQuantity = (qty: number, productId?: string) => {
  purchaseQty.value = qty
  updateCart(productId as string, purchaseQty.value)
}
const router = useRouter()
function handleNavigate() {
  router.push('/checkout')
}
</script>
<template>
  <section class="cart-section">
    <div class="container pb-5">
      <div class="d-flex align-items-center py-4">
        <h3 class="text-uppercase mb-0">裝備整備清單</h3>
        <div
          class="ms-3 flex-grow-1"
          style="height: 1px; background: linear-gradient(90deg, var(--bs-primary), transparent)"
        ></div>
      </div>

      <div class="row g-5">
        <div class="col-lg-8">
          <template v-if="cartItems.length == 0">
            <RouterLink to="/products" class="link-info">返回商店</RouterLink>
            <div
              class="card-empty p-3 mt-4"
              style="
                background-color: rgba(255, 183, 3, 0.05);
                border: 1px dashed var(--bs-primary);
              "
            >
              <small class="text-primary font-monospace">※ 目前清單中內沒有任何裝備</small>
            </div>
          </template>
          <template v-else>
            <div class="table-responsive">
              <table class="cart-table table table-dark align-middle">
                <thead>
                  <tr>
                    <th scope="col" class="border-0 ps-0">稀有裝備名稱</th>
                    <th scope="col" class="border-0 text-center">數量</th>
                    <th scope="col" class="border-0 text-end">交易代價</th>
                    <th scope="col" class="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="cart-item-row" v-for="item in cartItems" :key="item.product.id">
                    <th scope="row" class="border-0 px-3 py-4">
                      <div class="d-flex align-items-center">
                        <img
                          :src="item.product.imageUrl"
                          :alt="item.product.title"
                          class="cart-item-img"
                          style="width: 80px; height: 80px; object-fit: cover"
                        />
                        <div class="ms-3">
                          <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                          <small class="text-neutral">{{ `類別：${item.product.category}` }}</small>
                        </div>
                      </div>
                    </th>
                    <td class="border-0" style="width: 200px">
                      <ProductQuantityInput
                        :product-nums="item.product.num"
                        :product-id="item.product.id"
                        :input-quantity="item.qty"
                        @emit-quantity="getQuantity"
                      />
                    </td>
                    <td class="border-0 text-end">
                      <p class="mb-0 text-primary fw-bold">
                        {{ `NT$ ${item.product.price.toLocaleString()}` }}
                      </p>
                    </td>
                    <td class="border-0 text-center">
                      <i
                        class="fas fa-times btn-remove"
                        @click="handleRemoveCarts(item.product.id)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="input-group w-50 mt-4">
              <input
                type="text"
                class="form-control secret-code-input rounded-0 border-top-0 border-start-0 border-end-0 shadow-none"
                placeholder="輸入舞會密語 (Coupon Code)"
              />
              <button
                class="btn btn-outline-primary border-top-0 border-start-0 border-end-0 rounded-0"
                type="button"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </template>
        </div>

        <div class="col-lg-4">
          <div class="order-summary-card p-4">
            <h4 class="fw-bold mb-4 text-uppercase text-center" style="letter-spacing: 3px">
              交易契約
            </h4>

            <div class="d-flex justify-content-between mb-3">
              <span class="text-neutral">初步評估 (小計)</span>
              <span class="text-light">{{ `NT$ ${totalPrice.toLocaleString()}` }}</span>
            </div>
            <div class="d-flex justify-content-between mb-4 border-bottom border-secondary pb-3">
              <span class="text-neutral">支付手段</span>
              <span class="text-light">ApplePay</span>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="mb-0 h5 fw-bold text-uppercase">最終總價</p>
              <p class="mb-0 h3 fw-bold text-primary">{{ `NT$ ${totalPrice.toLocaleString()}` }}</p>
            </div>

            <button
              role="button"
              class="btn btn-primary w-100 py-3 text-uppercase fw-bold shadow-lg"
              :disabled="cartLength === 0"
              @click="handleNavigate"
            >
              確認交易契約 <i class="fas fa-scroll ms-2"></i>
            </button>

            <p
              class="text-center mt-3 mb-0"
              style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.3)"
            >
              * 簽署後即代表同意進入 Final Masquerade 宇宙法則
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.cart-section {
  min-height: 80vh;
}

.cart-table {
  border-spacing: 0 10px;
  /* 行與行之間產生間距 */
  border-collapse: separate;

  thead th {
    color: var(--bs-primary);
    text-transform: uppercase;
    letter-spacing: 2px;
    border-top: none;
    border-bottom: 2px solid var(--bs-primary) !important;
    padding: 1.5rem 1rem;
  }

  /* 修正表格儲存格的邊框與內距 */
  th,
  td {
    padding: 1.5rem 1rem !important;
  }
}
/* 每一行改為深紫色半透明，並加入磨砂感 */
.cart-item-row {
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.01);
    th,
    td {
      /* 滑過時透出淡淡金光 */
      background-color: var(--bs-dark-300);
      // background-color: rgba(255, 183, 3, 0.08);
    }
  }
}

.cart-item-img {
  border: 1px solid rgba(255, 183, 3, 0.4);
  box-shadow: 0 0 10px rgba(255, 183, 3, 0.1);
}

/* 移除按鈕樣式 */
.btn-remove {
  color: var(--bs-neutral);
  cursor: pointer;
  transition: color 0.3s;
}

.btn-remove:hover {
  color: #ff4d4d;
}

/* 訂單摘要卡片 */
.order-summary-card {
  background-color: #211238;
  border: 1px solid var(--bs-primary) !important;
  border-style: double !important;
  /* 雙線邊框增加儀式感 */
  border-width: 3px !important;
}

.secret-code-input {
  background-color: transparent !important;
  border-color: var(--bs-primary) !important;
  color: var(--bs-primary) !important;
}

.secret-code-input::placeholder {
  color: var(--bs-neutral);
}
</style>
