<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  productNums: number
  productId: string
  inputQuantity?: number
}>()

const emit = defineEmits<{
  emitQuantity: [qty: number, productId: string]
}>()

const emitQuantity = (qty: number) => {
  emit('emitQuantity', qty, props.productId)
}
const purchaseQty = ref<number>(props.inputQuantity || 1)
const initialQty = () => {
  purchaseQty.value = 1
}
type handleInput = 'plus' | 'minus'
const handleQuantity = (mode: handleInput) => {
  if (mode === 'plus') {
    purchaseQty.value += 1
  } else {
    purchaseQty.value -= 1
  }

  emitQuantity(purchaseQty.value)
}

defineExpose({
  initialQty,
})
</script>
<template>
  <div class="input-group quantity-input-group">
    <button
      class="btn btn-outline-primary border-end-0"
      type="button"
      :disabled="purchaseQty === 1"
      @click="handleQuantity('minus')"
    >
      <i class="fas fa-minus"></i>
    </button>
    <input
      type="text"
      class="form-control text-center shadow-none"
      v-model="purchaseQty"
      :max="productNums"
      readonly
    />
    <button
      class="btn btn-outline-primary border-start-0"
      type="button"
      :disabled="purchaseQty === productNums"
      @click="handleQuantity('plus')"
    >
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>
<style lang="scss" scoped>
/* 數量選擇器自定義樣式 */
.quantity-input-group .form-control {
  background-color: #211238;
  border-color: rgba(255, 183, 3, 0.3);
  color: var(--bs-primary);
}

.quantity-input-group .btn {
  border-color: rgba(255, 183, 3, 0.3);
  color: var(--bs-primary);
}

.quantity-input-group .btn:hover {
  background-color: var(--bs-primary);
  color: var(--bs-dark);
}
</style>
