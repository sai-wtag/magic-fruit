import { vi, beforeEach } from 'vitest'

// jsdom has no media stack — stub it so sound effects stay silent and quiet.
class AudioStub {
  constructor(src) {
    this.src = src
    this.volume = 1
  }

  play() {
    return Promise.resolve()
  }
}

vi.stubGlobal('Audio', AudioStub)

beforeEach(() => {
  window.localStorage.clear()
})
