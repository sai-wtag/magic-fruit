<template>
  <svg
    data-testid="app-icon"
    :data-icon="name"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="inline-block shrink-0"
    :class="sizeClass"
    :aria-hidden="label ? undefined : 'true'"
    :aria-label="label"
    :role="label ? 'img' : undefined"
    v-html="body" />
</template>

<script setup>
import { computed } from 'vue'
import { ICONS } from '@/constants/icons'

const SIZES = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-12 w-12',
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md' },
  strokeWidth: { type: [Number, String], default: 2 },
  /** Set only for icons that carry meaning on their own; otherwise decorative. */
  label: { type: String, default: '' },
})

const body = computed(() => ICONS[props.name] ?? '')
const sizeClass = computed(() => SIZES[props.size] ?? SIZES.md)
</script>
