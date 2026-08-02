<template>
  <!-- Purely decorative colour wash; kept out of the flow and off the a11y tree. -->
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div
      class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-glow-brand blur-3xl sm:h-96 sm:w-96" />
    <div
      class="absolute -right-28 top-1/3 h-72 w-72 rounded-full bg-glow-accent blur-3xl sm:h-96 sm:w-96" />
    <div
      class="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-glow-danger blur-3xl sm:h-96 sm:w-96" />
  </div>
</template>
