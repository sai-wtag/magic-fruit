<template>
  <picture>
    <source :srcset="`/images/fruits/${id}.webp`" type="image/webp" />
    <img
      data-testid="fruit-image"
      :src="`/images/fruits/${id}.png`"
      :alt="alt"
      :width="size"
      :height="size"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      class="h-full w-full object-contain" />
  </picture>
</template>

<script setup>
defineProps({
  id: { type: Number, required: true },
  alt: { type: String, default: '' },
  /** Intrinsic size hint — reserves space so the grid never shifts on load. */
  size: { type: Number, default: 96 },
  eager: { type: Boolean, default: false },
})
</script>
