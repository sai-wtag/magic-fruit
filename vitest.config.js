import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { alias } from './alias.js'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/unit/**/*.spec.js'],
  },
  resolve: {
    alias,
  },
})
