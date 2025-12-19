<template>
  <section id="about-section" class="about-section">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title text-uppercase">關於 Final Masquerade</h2>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="about-img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800"
              alt="華麗舞會示意圖 - 遊戲背景"
              loading="lazy"
            />
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
            <RouterLink to="/products" class="btn btn-outline-primary mt-3"
              >探索商品細節</RouterLink
            >
          </div>
        </div>
        <div class="col-md-6 mb-4 mb-md-0">
          <div class="about-img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800"
              alt="神秘交易示意圖"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.about {
  &-section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  &-img-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

    img {
      width: 100%;
      height: 400px;
      /* 固定高度讓排版更整齊 */
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &-img-wrapper:hover {
    img {
      transform: scale(1.05);
    }
  }

  &-text-box {
    padding: 2rem;
  }

  &-badge {
    color: var(--bs-primary);
    border-left: 3px solid var(--bs-primary);
    padding-left: 1rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &-description {
    color: var(--bs-neutral);
    line-height: 1.8;
  }
}
</style>
