<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="card rounded-0">
        <div class="card-header bg-white border-0 py-3">
          <p class="mb-0 position-relative custom-checkout-label text-black">Apple Pay</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.custom-checkout-label {
  padding-left: 28px;
  cursor: pointer;

  &::after,
  &::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    top: 50%;
  }

  &::before {
    left: 10px;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0.87);
  }

  &::after {
    left: 0px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.87);
  }
}
</style>
