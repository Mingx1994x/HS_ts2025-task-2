<script setup lang="ts">
import type { TProduct } from '@/types/customer/product'
type TVariantCard = {
  variant?: 'intro' | 'default' | 'compact'
}
const props = withDefaults(defineProps<TProduct & TVariantCard>(), {
  variant: 'default',
})

const imageHeight = {
  intro: '300px',
  default: '280px',
  compact: '200px',
}
</script>
<template>
  <div class="card border-0 h-100 position-relative">
    <img
      :src="props.imageUrl"
      class="card-img-top object-fit-cover"
      :alt="props.title"
      :style="`height: ${imageHeight[props.variant]}`"
      loading="lazy"
    />
    <div
      class="card-body"
      :class="{
        'text-center': variant === 'intro',
        'd-flex': variant === 'intro',
        'flex-column': variant === 'intro',
      }"
    >
      <h3 v-if="variant === 'intro'" class="intro-type-card-title text-uppercase">
        {{ props.title }}
      </h3>
      <h4 v-else class="fs-6 mt-2">
        <RouterLink :to="`/product-detail/${props.id}`" class="stretched-link">{{
          props.title
        }}</RouterLink>
      </h4>
      <template v-if="variant === 'default'">
        <p class="text-neutral mt-2 mb-0">
          剩餘 <span class="fw-bold text-primary">{{ props.num }}</span>
          {{ props.unit }}
        </p>
      </template>
      <div
        class="d-flex align-items-center"
        :class="{
          'justify-content-center': variant === 'intro',
          'my-2': variant === 'intro',
        }"
      >
        <span
          class="text-primary fw-bold me-2"
          :class="{
            'intro-type-card-price': variant === 'intro',
          }"
          >NT$ {{ props.price.toLocaleString() }}</span
        >
        <small class="text-neutral text-decoration-line-through"
          >NT$ {{ props.origin_price.toLocaleString() }}</small
        >
      </div>
      <template v-if="variant === 'intro'">
        <p class="card-text text-neutral">
          {{ props.description }}
        </p>
        <RouterLink
          :to="`/product-detail/${props.id}`"
          class="btn btn-primary btn-sm mt-auto align-self-center stretched-link"
          >立即訂購</RouterLink
        >
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.intro-type-card {
  &-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  &-price {
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
