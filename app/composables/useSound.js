import { usePreferencesStore } from '@/stores/preferences'

const SOUNDS = {
  start: '/sounds/start.wav',
  success: '/sounds/success.mp3',
}

const VOLUME = 0.6

/**
 * Plays the game's short effects, honouring the user's sound preference.
 * Every failure mode (SSR, autoplay policy, missing file) is non-fatal —
 * audio is decoration, it must never break a round.
 */
export function useSound() {
  const preferences = usePreferencesStore()

  function play(name) {
    const src = SOUNDS[name]

    if (!src || !preferences.soundEnabled || typeof Audio === 'undefined') {
      return
    }

    try {
      const audio = new Audio(src)
      audio.volume = VOLUME
      audio.play()?.catch(() => {})
    } catch {
      // Ignore — playback is optional.
    }
  }

  return { play }
}
