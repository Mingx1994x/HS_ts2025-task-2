<template>
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
        placeholder="致力於提供獨特、華麗的個人品牌商品，將神祕美學融入您的生活... "
      ></textarea>
    </div>
  </form>
</template>
