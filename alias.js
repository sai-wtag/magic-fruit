import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// The package is ESM, so `__dirname` isn't available — derive it from the URL.
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)))
const srcDir = resolve(rootDir, 'app')

/**
 * Mirrors Nuxt 4's built-in aliases so unit tests resolve imports the same way
 * the app does: `~`/`@` point at the source dir, `~~`/`@@` at the project root.
 */
export const alias = {
  '~~': rootDir,
  '@@': rootDir,
  '~': srcDir,
  '@': srcDir,
}
