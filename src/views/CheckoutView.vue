<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleNavigate() {
  router.push('/cart')
}
</script>
<template>
  <section class="checkout-section">
    <div class="container pb-5">
      <div class="d-flex align-items-center py-4">
        <h3 class="text-uppercase mb-0">輸入交易資訊</h3>
        <div
          class="ms-3 flex-grow-1"
          style="height: 1px; background: linear-gradient(90deg, var(--bs-primary), transparent)"
        ></div>
      </div>

      <div class="row g-5">
        <div class="col-lg-7">
          <form>
            <div class="mb-2">
              <label for="ContactMail" class="text-neutral mb-0">電子信箱</label>
              <input
                type="email"
                class="form-control"
                id="ContactMail"
                aria-describedby="emailHelp"
                placeholder="example@gmail.com"
              />
            </div>
            <div class="mb-2">
              <label for="ContactName" class="text-neutral mb-0">姓名</label>
              <input type="text" class="form-control" id="ContactName" placeholder="王漂亮" />
            </div>
            <div class="mb-2">
              <label for="ContactPhone" class="text-neutral mb-0">手機</label>
              <input type="text" class="form-control" id="ContactPhone" placeholder="0912345678" />
            </div>
            <div class="mb-2">
              <label for="ContactMessage" class="text-neutral mb-0">留言</label>
              <textarea
                class="form-control"
                rows="3"
                id="ContactMessage"
                placeholder="六角學院，只要你不放棄，我們就不放棄你 ... "
              ></textarea>
            </div>
          </form>
          <div
            class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100"
          >
            <a role="button" class="link-info mt-md-0 mt-3" @click="handleNavigate"
              ><i class="fas fa-chevron-left me-2"></i>返回</a
            >
            <button
              type="button"
              class="btn btn-primary px-5 py-3 text-uppercase fw-bold shadow-lg"
            >
              結帳
            </button>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="order-summary-card p-4">
            <h4 class="fw-bold mb-4 text-uppercase text-center" style="letter-spacing: 3px">
              整備內容
            </h4>

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
