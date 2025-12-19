<template>
  <section id="comment-section" class="comment-section">
    <div class="container text-center">
      <h2 class="section-title text-uppercase mb-5">舞會傳聞：參與者誌記</h2>
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
</template>
<style lang="scss">
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
</style>