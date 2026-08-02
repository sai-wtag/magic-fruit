<template>
  <div class="relative">
    <AppIcon
      name="languages"
      size="sm"
      class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />

    <select
      data-testid="language-select"
      :value="locale"
      :aria-label="$t('general.select-language')"
      class="h-11 w-full min-w-[8.5rem] cursor-pointer appearance-none rounded-2xl border border-line bg-card pl-9 pr-9 text-sm font-semibold text-ink transition hover:border-brand/50"
      @change="onChange">
      <option
        v-for="{ code, name } in locales"
        :key="code"
        :value="code"
        v-text="name" />
    </select>

    <AppIcon
      name="chevron-down"
      size="sm"
      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALES } from '@/constants/locales'
import AppIcon from '@/components/ui/AppIcon.vue'

const i18n = useI18n()

const locales = LOCALES
const locale = computed(() => i18n.locale.value)

function onChange(event) {
  const { value } = event.target

  // `setLocale` only exists when the Nuxt i18n module is installed; plain
  // vue-i18n (unit tests, storybook-like usage) falls back to the ref.
  if (typeof i18n.setLocale === 'function') {
    i18n.setLocale(value)
    return
  }

  i18n.locale.value = value
}
</script>
