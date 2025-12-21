import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { TProduct } from '@/types/customer/product'

type TCartItem = {
  product: TProduct
  qty: number
}

export const useCartStore = defineStore('Cart Store', () => {
  // data
  const cartItems = ref<TCartItem[]>([])

  //  getters
  const cartLength = computed(() => cartItems.value.length)
  const totalPrice = computed(() =>
    cartItems.value.reduce((acc, item) => acc + item.product.price * item.qty, 0),
  )

  // actions
  const addCart = (product: TProduct, qty: number) => {
    const existItem = cartItems.value.find((item) => item.product.id === product.id)

    if (existItem) {
      const wantedQty = existItem.qty + qty
      if (wantedQty > existItem.product.num) {
        const error = new Error()
        error.message = '已超出裝備可購買數量最大值，請再確認數量或挑選其他裝備'
        throw error
      }
      existItem.qty += qty
      return
    }

    cartItems.value.push({
      product,
      qty,
    })
  }

  const removeCart = (id: string) => {
    console.log(id)

    const removeIndex = cartItems.value.findIndex((item) => item.product.id === id)

    if (removeIndex === -1) {
      alert('ID 錯誤，請稍後再試')
      return
    }

    cartItems.value.splice(removeIndex, 1)
  }

  const updateCart = (id: string, qty: number) => {
    const existItem = cartItems.value.find((item) => item.product.id === id)

    if (existItem) {
      existItem.qty = qty
    } else {
      alert('裝備 ID 錯誤，請稍候再試')
    }
  }

  return { cartItems, cartLength, totalPrice, addCart, removeCart, updateCart }
})
