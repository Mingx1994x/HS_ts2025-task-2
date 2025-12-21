<script setup lang="ts">
  import SectionBanner from '@/layout/home/SectionBanner.vue';
  import SectionProducts from '@/layout/home/SectionProducts.vue';
  import SectionComment from '@/layout/home/SectionComment.vue';
  import SectionAbout from '@/layout/home/SectionAbout.vue';
</script>
<template>
  <SectionBanner />
  <SectionProducts />
  <SectionComment />
  <SectionAbout />
</template>
<style lang="scss">
  .section-title{
    position: relative;
    &::after{
      content: '';
      width: 60px; 
      height: 3px; 
      background-color: var(--bs-primary);
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>