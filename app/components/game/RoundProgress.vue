<template>
  <div class="flex flex-col gap-2" data-testid="round-progress">
    <div class="flex items-baseline justify-between text-xs font-semibold">
      <span
        class="text-muted"
        data-testid="round-progress-label"
        v-text="$t('general.round-of', { current, total })" />
      <span class="text-brand" data-testid="round-progress-value">
        {{ percentage }}%
      </span>
    </div>

    <div
      class="h-2 overflow-hidden rounded-full bg-line"
      role="progressbar"
      :aria-valuenow="current"
      aria-valuemin="0"
      :aria-valuemax="total">
      <div
        data-testid="round-progress-bar"
        class="h-full rounded-full bg-linear-to-r from-brand to-accent transition-[width] duration-500 ease-out"
        :style="{ width: `${percentage}%` }" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  percentage: { type: Number, required: true },
})
</script>
