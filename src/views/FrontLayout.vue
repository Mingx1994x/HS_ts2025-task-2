<script setup lang="ts">
import Navbar from '@/components/LayoutNavbar.vue';
import Footer from '@/components/LayoutFooter.vue';

</script>
<template>
  <Navbar />
  <div class="mt-nav">
    <RouterView />
  </div>
  <Footer />
</template>
<style lang="scss">
  .mt-nav{
    margin-top: 80px;
  }
</style>