<template>
  <div data-testid="question-screen" class="flex flex-1 flex-col">
    <section class="flex flex-1 flex-col gap-5 pb-28">
      <RoundProgress
        :current="round"
        :total="totalRounds"
        :percentage="progress" />

      <h2
        data-testid="question-title"
        class="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl"
        v-text="$t(questionKey)" />

      <FruitGrid :fruits="fruits" />
    </section>

    <ActionBar>
      <BaseButton
        data-testid="no-button"
        variant="negative"
        class="flex-1"
        @click="$emit('answer', false)">
        <template #leading>
          <AppIcon name="x" size="sm" />
        </template>
        {{ $t('general.no') }}
      </BaseButton>

      <BaseButton
        data-testid="yes-button"
        variant="positive"
        class="flex-1"
        @click="$emit('answer', true)">
        {{ $t('general.yes') }}
        <template #trailing>
          <AppIcon name="check" size="sm" />
        </template>
      </BaseButton>
    </ActionBar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ActionBar from '@/components/ui/ActionBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FruitGrid from '@/components/game/FruitGrid.vue'
import RoundProgress from '@/components/game/RoundProgress.vue'

const props = defineProps({
  round: { type: Number, required: true },
  totalRounds: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  fruits: { type: Array, default: () => [] },
})
defineEmits(['answer'])

// The question gets shorter as the game goes on — it keeps the pace up.
const QUESTION_KEYS = {
  1: 'fruit.confirmation',
  2: 'fruit.available',
}

const questionKey = computed(
  () => QUESTION_KEYS[props.round] ?? 'fruit.here'
)
</script>
