<template>
  <div data-testid="board-screen" class="flex flex-1 flex-col">
    <section class="flex flex-1 flex-col gap-5 pb-28">
      <div class="flex flex-col gap-1.5">
        <span
          class="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-strong">
          <AppIcon name="brain" size="xs" />
          {{ $t('board.step') }}
        </span>

        <h2
          data-testid="board-title"
          class="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl"
          v-text="$t('fruit.pick-fruit')" />

        <p class="text-balance text-sm text-muted" v-text="$t('board.hint')" />
      </div>

      <FruitGrid :fruits="fruits" />
    </section>

    <ActionBar>
      <BaseButton
        data-testid="back-button"
        variant="neutral"
        class="flex-1"
        @click="$emit('back')">
        <template #leading>
          <AppIcon name="arrow-left" size="sm" />
        </template>
        {{ $t('general.previous') }}
      </BaseButton>

      <BaseButton
        data-testid="next-button"
        variant="primary"
        class="flex-1 grow-[1.6]"
        @click="$emit('next')">
        {{ $t('general.next') }}
        <template #trailing>
          <AppIcon name="arrow-right" size="sm" />
        </template>
      </BaseButton>
    </ActionBar>
  </div>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import ActionBar from '@/components/ui/ActionBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import FruitGrid from '@/components/game/FruitGrid.vue'

defineProps({
  fruits: { type: Array, default: () => [] },
})
defineEmits(['back', 'next'])
</script>
