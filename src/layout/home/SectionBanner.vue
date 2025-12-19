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
</style>