<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>
<template>
  <section id="banner-section" class="banner-image d-flex align-items-center justify-content-center pt-5"
    style="background-image: url('https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=1920')">
    <div class="banner-mask"></div>
    <div class="container banner-content text-center text-white">
      <h2 class="text-uppercase mb-3">歡迎來到永恆的化妝舞會</h2>
      <p class="lead mb-4">
        在陰影中，美學永存。探索我們的華麗收藏。
      </p>
      <RouterLink 
        class="btn btn-primary btn-lg text-uppercase"
        to="/products"
      >
      探索收藏
    </RouterLink>
    </div>
  </section>
  <section id="product-section" class="product-section container">
    <div class="text-center mb-5">
      <h2 class="text-uppercase">精選商品</h2>
      <p class="text-neutral">我們為您挑選了最具神秘風格的獨特單品。</p>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100">
          <img src="https://images.unsplash.com/photo-1507643179773-3e975d7ac515?auto=format&fit=crop&q=80&w=600"
            class="card-img-top object-fit-cover" alt="華麗的黑色蕾絲面具" loading="lazy" style="height: 300px;" />
          <div class="card-body text-center">
            <h3 class="product-card-title text-uppercase">暗夜使者面具</h3>
            <p class="product-card-price text-primary my-2">NT$ 2,800</p>
            <p class="card-text text-neutral">以義大利傳統工藝打造的精緻蕾絲面具，低調中盡顯奢華。</p>
            <a href="mailto:order@lastmasquerade.com?subject=訂購暗夜使者面具" class="btn btn-primary btn-sm mt-3">立即訂購</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600"
            class="card-img-top object-fit-cover" alt="鑲有黑曜石的銀色項鍊" loading="lazy" style="height: 300px;"/>
          <div class="card-body text-center">
            <h3 class="product-card-title text-uppercase">黑曜石的嘆息</h3>
            <p class="product-card-price text-primary my-2">NT$ 5,600</p>
            <p class="card-text text-neutral">精工雕琢的純銀項鍊，搭配神祕的黑曜石，散發難以抗拒的魅力。</p>
            <a href="mailto:order@lastmasquerade.com?subject=訂購黑曜石的嘆息" class="btn btn-primary btn-sm mt-3">立即訂購</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="https://source.unsplash.com/600x400/?dark,candelabra,interior" class="card-img-top object-fit-cover"
            alt="充滿哥德式風格的房間裝飾" loading="lazy" style="height: 300px;" />
          <div class="card-body text-center">
            <!-- <img src="https://images.unsplash.com/photo-1536502225820-914c14624b5e?auto=format&fit=crop&q=80&w=600"
            class="card-img-top object-fit-cover" alt="充滿哥德式風格的房間裝飾" loading="lazy" style="height: 300px;"> -->
            <div class="card-body text-center">
              <h3 class="product-card-title text-uppercase">哥德式夜曲</h3>
              <p class="product-card-price text-primary my-2">NT$ 9,900</p>
              <p class="card-text text-neutral">一盞充滿歷史感的鑄鐵燭臺，為您的空間點亮一絲華麗的陰影。</p>
              <a href="mailto:order@lastmasquerade.com?subject=訂購哥德式夜曲" class="btn btn-primary btn-sm mt-3">立即訂購</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
  <section id="comment-section" class="comment-section">
    <div class="container text-center">
      <h2 class="text-uppercase mb-5">客戶讚譽</h2>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <blockquote class="blockquote text-white mb-4">
            <p>“這是最讓我驚豔的一次購物經驗！「黑曜石的嘆息」項鍊細節無可挑剔，戴上它，彷彿整個人的氣場都變得更神祕、更有力量。包裝也充滿儀式感，絕對值得收藏。我已成為 Last Masquerade 的忠實顧客。”</p>
            <footer class="blockquote-footer mt-3" style="color: var(--lm-primary) !important;">
              來自：<cite title="顧客名稱">台北市 李先生</cite>
            </footer>
          </blockquote>
        </div>
      </div>

      <div class="slot-placeholder">
        之後會用 Section SDD 產生「更多客戶評論輪播或其他評論佈局」，請開發者**整段貼在兩個註解中間**來替換。
      </div>

    </div>
  </section>
  <section id="about-section" class="about-section">
    <div class="container">
      <h2 class="text-uppercase text-center mb-5">關於化妝舞會</h2>
      <div class="row align-items-center mb-5">
        <div class="col-md-6 mb-4 mb-md-0">
          <img
            src="https://images.unsplash.com/photo-1588607217357-1cc72c3d191a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NTZ8fGdvdGhpYyUyMGNodXJjaHxlbnwwfHx8fHwxNzA5Mjg3NzI2fDA&ixlib=rb-4.1.0&q=80&w=800"
            class="img-fluid rounded shadow-lg about-image" alt="在深色調的哥德式教堂內景" loading="lazy">
        </div>
        <div class="col-md-6">
          <h3 class="text-uppercase">品牌願景：黑暗美學</h3>
          <p class="text-neutral">
            Last Masquerade 相信，真正的華麗藏於陰影之中。我們的品牌靈感來自於古老的貴族舞會和哥德式藝術，致力於發掘並呈現那種既神祕又極具設計感的獨特美學。我們拒絕平庸，專注於那些能喚醒靈魂深處浪漫情懷的單品。
          </p>
          <p class="text-neutral">
            我們的每一件產品，都是一場對日常生活的微型反叛，一次對自身獨特性的宣告。戴上或擁有它們，您不是在跟隨潮流，而是成為潮流的創造者。
          </p>
          <a href="https://www.google.com/search?q=Last+Masquerade+Brand+Story" class="text-decoration-underline"
            target="_blank" rel="noopener noreferrer">
            閱讀完整故事 &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>
  <section id="contact-section" class="contact-section text-center text-white">
    <div class="container">
      <h2 class="text-uppercase mb-5">聯絡化妝舞會</h2>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <p class="lead mb-4">
            無論是訂單查詢、產品諮詢，或是品牌合作邀約，我們都期待您的訊息。
          </p>

          <ul class="list-unstyled mb-5">
            <li class="my-3">
              <i class="fas fa-envelope contact-icon"></i>
              電子郵件：<a href="mailto:hello@lastmasquerade.com" target="_blank"
                rel="noopener noreferrer">hello@lastmasquerade.com</a>
            </li>
            <li class="my-3">
              <i class="fas fa-phone contact-icon"></i>
              電話專線：<a href="tel:+886912345678" target="_blank" rel="noopener noreferrer">+886-912-345-678 (僅供客服)</a>
            </li>
            <li class="my-3">
              <i class="fas fa-map-marker-alt contact-icon"></i>
              品牌地址：<a href="https://maps.app.goo.gl/abcdefg" target="_blank" rel="noopener noreferrer">台北市信義區神秘街13號</a>
            </li>
          </ul>

          <div class="social-links mb-4">
            <a href="https://www.instagram.com/last_masquerade_official" target="_blank" rel="noopener noreferrer"
              class="text-white mx-3 footer-social-icon"><i class="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/LastMasqueradeOfficial" target="_blank" rel="noopener noreferrer"
              class="text-white mx-3 footer-social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="https://line.me/ti/p/@lastmasquerade" target="_blank" rel="noopener noreferrer"
              class="text-white ms-3 footer-social-icon"><i class="fab fa-line"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
  .banner{
    &-image {
      height: 100vh;
      /* 確保主視覺區在行動裝置有足夠高度 */
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
    }

    &-content {
      z-index: 10;
      h1 {
      font-size: clamp(2.5rem, 8vw, 4rem);
      /* RWD 標題字體大小 */
      letter-spacing: 0.2em;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
      }

      p {
      font-size: clamp(1rem, 3vw, 1.5rem);
      }

    &-mask{
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}

.product{
  &-section{
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