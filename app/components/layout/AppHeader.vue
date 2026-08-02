<template>
  <header
    class="flex items-center justify-between gap-3 py-4 sm:py-6"
    data-testid="app-header">
    <div class="flex min-w-0 items-center gap-2.5">
      <span
        class="grid h-10 w-10 place-items-center rounded-2xl bg-linear-to-br from-brand to-accent text-on-brand shadow-lift">
        <AppIcon name="sparkles" size="md" />
      </span>

      <span class="min-w-0">
        <span
          class="block truncate text-base font-extrabold tracking-tight sm:text-lg"
          data-testid="app-title"
          v-text="$t('project.title')" />
        <span
          class="hidden text-xs text-muted sm:block"
          v-text="$t('project.tagline')" />
      </span>
    </div>

    <div class="flex shrink-0 items-center gap-2">
      <SoundToggle />
      <LanguageSelect class="w-[9.5rem] sm:w-44" />
    </div>
  </header>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import SoundToggle from '@/components/ui/SoundToggle.vue'
import LanguageSelect from '@/components/ui/LanguageSelect.vue'
</script>
