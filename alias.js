import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// The package is ESM, so `__dirname` isn't available — derive it from the URL.
const root = resolve(dirname(fileURLToPath(import.meta.url)))
const at = path => resolve(root, path)

/** Mirrors Nuxt's built-in aliases so unit tests resolve imports the same way. */
export const alias = {
  '~': at('.'),
  '~/': at('./'),
  '~~': at('.'),
  '~~/': at('./'),
  '@': at('.'),
  '@/': at('./'),
  '@@': at('.'),
  '@@/': at('./'),
}
