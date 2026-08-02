import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePreferencesStore } from '@/stores/preferences'

const STORAGE_KEY = 'magic-fruit:preferences'

describe('@/stores/preferences', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has sound on by default', () => {
    expect(usePreferencesStore().soundEnabled).toBe(true)
  })

  it('toggles sound and persists the choice', () => {
    const preferences = usePreferencesStore()

    preferences.toggleSound()

    expect(preferences.soundEnabled).toBe(false)
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))).toEqual({
      soundEnabled: false,
    })
  })

  it('restores a stored choice', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ soundEnabled: false })
    )

    const preferences = usePreferencesStore()
    preferences.restore()

    expect(preferences.soundEnabled).toBe(false)
  })

  it('keeps the defaults when the stored value is corrupt', () => {
    window.localStorage.setItem(STORAGE_KEY, 'not json')

    const preferences = usePreferencesStore()
    preferences.restore()

    expect(preferences.soundEnabled).toBe(true)
  })
})
