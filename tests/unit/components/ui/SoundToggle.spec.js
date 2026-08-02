import { describe, expect, it } from 'vitest'
import { mountWith, messages } from '@/tests/utils/mount'
import SoundToggle from '@/components/ui/SoundToggle.vue'

describe('@/components/ui/SoundToggle.vue', () => {
  it('starts pressed with sound on', () => {
    const button = mountWith(SoundToggle).find('[data-testid="sound-toggle"]')

    expect(button.attributes('aria-pressed')).toBe('true')
    expect(button.attributes('aria-label')).toBe(
      messages.en['general.sound-off']
    )
    expect(button.find('[data-icon="volume-on"]').exists()).toBe(true)
  })

  it('flips the icon and label when clicked', async () => {
    const wrapper = mountWith(SoundToggle)
    const button = wrapper.find('[data-testid="sound-toggle"]')

    await button.trigger('click')

    expect(button.attributes('aria-pressed')).toBe('false')
    expect(button.attributes('aria-label')).toBe(
      messages.en['general.sound-on']
    )
    expect(button.find('[data-icon="volume-off"]').exists()).toBe(true)
  })
})
