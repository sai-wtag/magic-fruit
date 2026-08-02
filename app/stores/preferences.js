import { defineStore } from 'pinia'

const STORAGE_KEY = 'magic-fruit:preferences'

const canUseStorage = () => typeof window !== 'undefined' && !!window.localStorage

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    soundEnabled: true,
  }),

  actions: {
    /** Rehydrate from localStorage. Call once on the client. */
    restore() {
      if (!canUseStorage()) {
        return
      }

      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)

        if (stored) {
          this.$patch(JSON.parse(stored))
        }
      } catch {
        // Corrupt or blocked storage — the defaults are a fine fallback.
      }
    },

    toggleSound() {
      this.soundEnabled = !this.soundEnabled
      this.persist()
    },

    persist() {
      if (!canUseStorage()) {
        return
      }

      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ soundEnabled: this.soundEnabled })
        )
      } catch {
        // Private mode / quota — preferences simply won't survive a reload.
      }
    },
  },
})
