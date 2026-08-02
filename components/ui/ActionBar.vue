<template>
  <div
    data-testid="action-bar"
    class="fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-surface/85 backdrop-blur-xl">
    <div
      class="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3.5 sm:px-6">
      <slot />
    </div>
  </div>
</template>
