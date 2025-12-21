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
      if (existItem.product.num === existItem.qty) {
        const error = new Error()
        error.message = '目前已達裝備可購買數量最大值，請挑選其他裝備'
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

  return { cartItems, cartLength, totalPrice, addCart, removeCart }
})
