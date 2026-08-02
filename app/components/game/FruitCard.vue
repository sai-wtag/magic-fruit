<template>
  <li
    data-testid="fruit"
    class="card-surface flex items-center gap-3 p-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-hairline hover:shadow-lift sm:flex-col sm:gap-2 sm:p-4 sm:text-center">
    <span
      class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft p-1.5 sm:h-16 sm:w-16 sm:p-2.5">
      <FruitImage :id="fruit.id" :alt="name" :size="64" />
    </span>

    <span
      data-testid="fruit-name"
      class="min-w-0 break-words text-sm font-semibold leading-tight sm:text-base"
      v-text="name" />
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FruitImage from '@/components/game/FruitImage.vue'

const props = defineProps({
  fruit: { type: Object, required: true },
})

const { t } = useI18n()
const name = computed(() => t(props.fruit.name))
</script>
