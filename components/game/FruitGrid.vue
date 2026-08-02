<template>
  <ul
    v-if="hasFruits"
    data-testid="fruit-grid"
    class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
    <FruitCard
      v-for="(fruit, index) in fruits"
      :key="`fruit-${fruit.id}`"
      :fruit="fruit"
      class="animate-fade-up"
      :style="{ animationDelay: `${Math.min(index, 12) * 30}ms` }" />
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import FruitCard from '@/components/game/FruitCard.vue'

const props = defineProps({
  fruits: { type: Array, default: () => [] },
})

const hasFruits = computed(() => props.fruits.length > 0)
</script>
