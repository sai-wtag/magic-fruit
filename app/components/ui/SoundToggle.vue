<template>
  <button
    type="button"
    data-testid="sound-toggle"
    :aria-pressed="preferences.soundEnabled"
    :aria-label="$t(labelKey)"
    :title="$t(labelKey)"
    class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-card text-muted transition hover:border-brand-hairline hover:text-brand active:scale-95"
    @click="preferences.toggleSound()">
    <AppIcon
      :name="preferences.soundEnabled ? 'volume-on' : 'volume-off'"
      size="md" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { usePreferencesStore } from '@/stores/preferences'
import AppIcon from '@/components/ui/AppIcon.vue'

const preferences = usePreferencesStore()

const labelKey = computed(() =>
  preferences.soundEnabled ? 'general.sound-off' : 'general.sound-on'
)
</script>
