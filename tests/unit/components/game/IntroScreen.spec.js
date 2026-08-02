import { describe, expect, it } from 'vitest'
import { mountWith, messages } from '@/tests/utils/mount'
import IntroScreen from '@/components/game/IntroScreen.vue'

describe('@/components/game/IntroScreen.vue', () => {
  it('greets the player with the project title', () => {
    const wrapper = mountWith(IntroScreen)

    expect(wrapper.find('[data-testid="intro-title"]').text()).toBe(
      messages.en['general.greetings'].replace(
        '{title}',
        messages.en['project.title']
      )
    )
  })

  it('explains the three steps of the trick', () => {
    const wrapper = mountWith(IntroScreen)

    expect(wrapper.findAll('ol li')).toHaveLength(3)
    expect(wrapper.text()).toContain(messages.en['intro.step-pick'])
    expect(wrapper.text()).toContain(messages.en['intro.step-reveal'])
  })

  it('emits "start" from the play button', async () => {
    const wrapper = mountWith(IntroScreen)

    await wrapper.find('[data-testid="start-button"]').trigger('click')

    expect(wrapper.emitted('start')).toBeTruthy()
  })

  it('loads the hero image eagerly — it is above the fold', () => {
    const image = mountWith(IntroScreen).find('[data-testid="fruit-image"]')

    expect(image.attributes('loading')).toBe('eager')
  })
})
