<template>
  <div data-testid="result-screen" class="flex flex-1 flex-col">
    <section
      class="flex flex-1 flex-col items-center justify-center gap-6 py-6 text-center">
      <span
        v-if="fruit"
        class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-strong">
        <AppIcon name="party-popper" size="xs" />
        {{ $t('general.ta-da') }}
      </span>

      <p
        v-if="fruit"
        data-testid="answer-label"
        class="text-sm font-medium text-muted sm:text-base"
        v-text="$t('general.your-answer')" />

      <div v-if="fruit" class="relative animate-pop">
        <span
          aria-hidden="true"
          class="absolute inset-0 animate-pulse-ring rounded-full bg-glow-brand" />
        <div
          class="relative grid h-40 w-40 place-items-center rounded-full border border-glass-line bg-glass p-6 shadow-lift backdrop-blur-xl sm:h-48 sm:w-48">
          <FruitImage :id="fruit.id" :alt="fruitName" :size="192" eager />
        </div>
      </div>

      <h2
        data-testid="answer-text"
        class="text-gradient text-balance text-4xl font-extrabold tracking-tight sm:text-6xl"
        v-text="fruitName" />

      <p
        v-if="fruit"
        data-testid="wrong-answer"
        class="text-sm text-muted"
        v-text="disclaimer" />
    </section>

    <ActionBar>
      <BaseButton
        data-testid="play-again-button"
        size="lg"
        block
        @click="$emit('restart')">
        <template #leading>
          <AppIcon name="rotate-ccw" size="md" />
        </template>
        {{ $t('general.play-again') }}
      </BaseButton>
    </ActionBar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'
import ActionBar from '@/components/ui/ActionBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FruitImage from '@/components/game/FruitImage.vue'

const props = defineProps({
  /** `null` when the answers didn't add up to a fruit — i.e. someone cheated. */
  fruit: { type: Object, default: null },
})
defineEmits(['restart'])

const { t } = useI18n()

const fruitName = computed(() =>
  props.fruit ? t(props.fruit.name) : t('general.wrong-answer')
)
const disclaimer = computed(
  () => `(${t('general.or')} ${t('general.wrong-answer')})`
)
</script>
