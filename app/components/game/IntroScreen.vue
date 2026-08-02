<template>
  <section
    data-testid="intro-screen"
    class="flex flex-1 flex-col items-center justify-center gap-7 py-6 text-center">
    <div class="relative animate-pop">
      <span
        aria-hidden="true"
        class="absolute inset-0 rounded-full bg-glow-brand blur-2xl" />
      <div class="relative h-40 w-40 animate-float sm:h-52 sm:w-52">
        <FruitImage :id="1" :alt="$t('fruit.jackfruit')" :size="208" eager />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h1
        data-testid="intro-title"
        class="text-gradient text-balance text-3xl font-extrabold tracking-tight sm:text-5xl"
        v-text="greeting" />

      <p
        class="text-balance text-sm text-muted sm:text-base"
        v-text="$t('project.tagline')" />
    </div>

    <ol class="grid w-full max-w-md gap-2.5 text-left sm:grid-cols-3">
      <li
        v-for="{ icon, key } in steps"
        :key="key"
        class="card-surface flex items-center gap-3 p-3 sm:flex-col sm:gap-2 sm:p-4 sm:text-center">
        <span
          class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-strong">
          <AppIcon :name="icon" size="md" />
        </span>
        <span class="text-sm font-medium leading-snug" v-text="$t(key)" />
      </li>
    </ol>

    <BaseButton
      data-testid="start-button"
      size="lg"
      class="w-full max-w-md"
      @click="$emit('start')">
      <template #leading>
        <AppIcon name="play" size="md" />
      </template>
      {{ $t('general.play') }}
    </BaseButton>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FruitImage from '@/components/game/FruitImage.vue'

defineEmits(['start'])

const steps = [
  { icon: 'hand-pointer', key: 'intro.step-pick' },
  { icon: 'check', key: 'intro.step-answer' },
  { icon: 'sparkles', key: 'intro.step-reveal' },
]

const { t } = useI18n()
const greeting = computed(() =>
  t('general.greetings', { title: t('project.title') })
)
</script>
