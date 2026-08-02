<template>
  <div class="relative flex min-h-[100dvh] flex-col">
    <BackgroundDecor />

    <div
      class="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-[env(safe-area-inset-top)] sm:px-6">
      <AppHeader />

      <main class="flex flex-1 flex-col">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import BackgroundDecor from '@/components/layout/BackgroundDecor.vue'
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()

onMounted(() => preferences.restore())
</script>
