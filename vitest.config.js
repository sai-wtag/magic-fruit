import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { alias } from './alias'

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
