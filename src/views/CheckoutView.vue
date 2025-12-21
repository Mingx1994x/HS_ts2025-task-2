<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title as string)
const nextButtonText = computed(() => route.meta.nextButtonText as string)
const nextPage = computed(() => route.meta.nextPage as string)
const router = useRouter()
function handleNavigate(path?: string) {
  if (!path) {
    // 返回
    router.back()
    return
  }
  router.push(path)
}

const cartStore = useCartStore()
const { cartItems, totalPrice } = storeToRefs(cartStore)
</script>
<template>
  <section class="checkout-section">
    <div class="container pb-5">
      <div class="d-flex align-items-center py-4">
        <h3 class="text-uppercase mb-0">{{ title }}</h3>
        <!-- <h3 class="text-uppercase mb-0" v-show="stepConfig[step].name === 'payment'">
          選擇付款方式
        </h3> -->
        <div
          class="ms-3 flex-grow-1"
          style="height: 1px; background: linear-gradient(90deg, var(--bs-primary), transparent)"
        ></div>
      </div>

      <div class="row g-5">
        <div class="col-lg-7">
          <RouterView />
          <div
            class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100"
          >
            <a type="button" class="link-info mt-md-0 mt-3" @click="handleNavigate('')"
              ><i class="fas fa-chevron-left me-2"></i>返回</a
            >
            <button
              type="button"
              class="btn btn-primary px-5 py-3 text-uppercase fw-bold shadow-lg"
              @click="handleNavigate(nextPage)"
            >
              {{ nextButtonText }}
            </button>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="order-summary-card p-4">
            <table class="border-bottom border-secondary mb-4 p-0 w-100">
              <template v-for="item in cartItems" :key="item.product.id">
                <tr>
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
                        <small class="text-neutral">{{ `X${item.qty}` }}</small>
                      </div>
                    </div>
                  </th>
                  <td class="border-0 text-end">
                    <p class="mb-0">
                      {{ `NT$ ${item.product.price.toLocaleString()}` }}
                    </p>
                  </td>
                </tr>
              </template>
            </table>
            <div class="d-flex justify-content-between mb-3">
              <span class="text-neutral">小計</span>
              <span class="text-light">{{ `NT$ ${totalPrice.toLocaleString()}` }}</span>
            </div>
            <div class="d-flex justify-content-between mb-4 border-bottom border-secondary pb-3">
              <span class="text-neutral">支付手段</span>
              <span class="text-light">ApplePay</span>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-0 h4 fw-bold">總計</p>
              <p class="mb-0 h4 fw-bold">{{ `NT$ ${totalPrice.toLocaleString()}` }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.checkout {
  &-section {
    min-height: calc(100vh - 215px);
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
