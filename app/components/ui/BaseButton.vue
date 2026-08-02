<template>
  <button
    :type="type"
    :disabled="disabled"
    class="group inline-flex touch-manipulation select-none items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
    :class="[BUTTON_VARIANTS[variant], BUTTON_SIZES[size], block && 'w-full']">
    <slot name="leading" />
    <span class="truncate"><slot /></span>
    <slot name="trailing" />
  </button>
</template>

<script setup>
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@/components/ui/button.styles'

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => value in BUTTON_VARIANTS,
  },
  size: {
    type: String,
    default: 'md',
    validator: value => value in BUTTON_SIZES,
  },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})
</script>
