import Dashboard from '@/views/dashboard/DashboardView.vue'
import FrontLayout from '@/views/front/FrontLayout.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'homePage',
          component: () => import('@/views/front/HomeView.vue'),
        },
        {
          path: 'products',
          name: 'productList',
          component: () => import('@/views/front/ProductList.vue'),
        },
        {
          path: 'product-detail/:id',
          name: 'productDetail',
          component: () => import('@/views/front/ProductDetail.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/front/CartView.vue'),
        },
        {
          path: 'checkout',
          name: 'checkoutView',
          component: () => import('@/views/front/CheckoutView.vue'),
          children: [
            {
              path: '',
              name: 'checkoutForm',
              component: () => import('@/layout/checkout/CheckoutForm.vue'),
              meta: {
                title: '輸入交易資訊',
                nextButtonText: '結帳',
                nextPage: '/checkout/payment',
              },
            },
            {
              path: 'payment',
              name: 'checkoutPayment',
              component: () => import('@/layout/checkout/CheckoutPayment.vue'),
              meta: {
                title: '選擇付款方式',
                nextButtonText: '付款',
                nextPage: '/payment-success',
              },
            },
          ],
        },
      ],
    },
    {
      path: '/payment-success',
      name: 'payment-success',
      component: () => import('@/views/front/PaymentSuccess.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/front/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        { path: '', redirect: 'product-management' },
        {
          path: '/product-management',
          name: 'product-management',
          component: () => import('@/views/dashboard/ProductManagement.vue'),
        },
        {
          path: '/order-management',
          name: 'order-management',
          component: () => import('@/views/dashboard/OrderManagement.vue'),
        },
        {
          path: '/coupon-management',
          name: 'coupon-management',
          component: () => import('@/views/dashboard/CouponManagement.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    }
  },
})

export default router
