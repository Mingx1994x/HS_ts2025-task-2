<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { RouterLink } from 'vue-router';

  import { getProductsAll } from '@/api/customerProducts';
  import { pickRandomItemsByCategory } from '@/utils/dataProcess';
  import type { TProduct } from '@/types/customer/product'; 

const selectedProducts=ref<TProduct[]>([])

const getSelectProducts=async()=>{
  try {
    const res=await getProductsAll()
    console.log(res);
    selectedProducts.value=pickRandomItemsByCategory(res.data.products,3)
    console.log("精選",selectedProducts.value);
    
  } catch (error) {
    console.error(error);
    alert('取得商品失敗')
  }
} 

onMounted(()=>{
  getSelectProducts()
})

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
      <h2 class="section-title text-uppercase mb-3">精選商品</h2>
      <p class="text-neutral">我們為您挑選了最具神秘風格的獨特單品。</p>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div 
        class="col" 
        v-for="product in selectedProducts"
        :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl"
            class="card-img-top object-fit-cover" :alt="product.title" loading="lazy" style="height: 300px;" />
          <div class="card-body text-center d-flex flex-column">
            <h3 class="product-card-title text-uppercase">{{product.title}}</h3>
            <p class="product-card-price text-primary my-2">{{ `NT$ ${product.price.toLocaleString()}` }}</p>
            <p class="card-text text-neutral">{{ product.description }}</p>
            <RouterLink to="/products" class="btn btn-primary btn-sm mt-auto align-self-center">立即訂購</RouterLink>
          </div>
        </div>
      </div>
    </div>

  </section>
  <section id="comment-section" class="comment-section">
    <div class="container text-center">
      <h2 class="section-title text-uppercase mb-5">舞會傳聞</h2>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <blockquote class="blockquote text-white mb-4">
            <p>“「面具共鳴」系統超出了我的想像。當我在午夜舞會戴上「黑曜石的嘆息」時，那種場景光影的變化與周圍 NPC 的反應，讓我完全沉浸在貴族博弈的緊張感中。這不只是一個商品，這是一張通往另一個世界的門票。”</p>
            <footer class="blockquote-footer mt-3">
              來自：<cite title="顧客名稱">台北市 | 艾莉絲</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
  <section id="about-section" class="about-section">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title text-uppercase">關於 Final Masquerade</h2>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="about-img-wrapper">
            <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800"
              alt="華麗舞會示意圖 - 遊戲背景" loading="lazy">
          </div>
        </div>
        <div class="col-md-6">
          <div class="about-text-box">
            <div class="about-badge text-uppercase">世界觀與特色</div>
            <p class="about-description">
              在 Final Masquerade
              的世界裡，權力與魔法隱藏於精緻的面具之後。這是一款以「高社會階層博弈」為背景的沉浸式遊戲，玩家將穿梭於華麗的歐式莊園與神秘的午夜舞會。獨特的「面具共鳴」系統讓每一場交易與對話都充滿變數，只有最冷靜的策略家，才能在這場永恆的化妝舞會中奪得最終的冠冕。
            </p>
          </div>
        </div>
      </div>

      <div class="row align-items-center flex-column-reverse flex-md-row">
        <div class="col-md-6">
          <div class="about-text-box">
            <div class="about-badge text-uppercase">商店交易說明</div>
            <p class="about-description">
              Final Masquerade
              官方商店僅提供經由黑金石認證的限定珍品。所有數位資產交易均透過加密傳輸，確保每一件面具、時裝或邀請函的唯一性與收藏價值。請注意，部分傳說級裝備僅限於特定舞會賽季產出，一旦售罄，僅能透過玩家間的秘密市集進行委託。
            </p>
            <RouterLink to="/products" class="btn btn-outline-primary mt-3">探索商品細節</RouterLink>
          </div>
        </div>
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="about-img-wrapper">
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800"
              alt="神秘交易示意圖" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
  .section-title{
    position: relative;
    &::after{
      content: '';
      width: 60px; 
      height: 3px; 
      background-color: var(--bs-primary);
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
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

  .comment-section {
      background-color: #211238;
      /* 不同的深色背景以區分 */
      padding-top: 5rem;
      padding-bottom: 5rem;

      .blockquote {
        font-style: italic;
        border-left: 5px solid var(--bs-primary);
        padding-left: 1.5rem;
        margin: 2rem 0;
        font-size: 1.1rem;

        &-footer{
          color: var(--bs-primary)
        }
      }
    }

  
    .about-section {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }

    .about-img-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .about-img-wrapper img {
      width: 100%;
      height: 400px;
      /* 固定高度讓排版更整齊 */
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .about-img-wrapper:hover img {
      transform: scale(1.05);
    }

    .about-text-box {
      padding: 2rem;
    }

    .about-badge {
      color: var(--bs-primary);
      border-left: 3px solid var(--bs-primary);
      padding-left: 1rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    .about-description {
      color: var(--bs-neutral);
      line-height: 1.8;
    }
</style>