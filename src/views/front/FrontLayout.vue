<script setup lang="ts">
import Navbar from '@/components/front/LayoutNavbar.vue'
import Footer from '@/components/front/LayoutFooter.vue'
</script>
<template>
  <Navbar />
  <div class="mt-nav">
    <RouterView />
  </div>
  <Footer />
</template>
<style lang="scss">
.mt-nav {
  margin-top: 80px;
}
</style>
