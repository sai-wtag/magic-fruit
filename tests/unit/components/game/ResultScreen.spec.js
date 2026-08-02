import { describe, expect, it } from 'vitest'
import { mountWith, messages } from '@/tests/utils/mount'
import ResultScreen from '@/components/game/ResultScreen.vue'
import { FRUITS } from '@/constants/fruits'

describe('@/components/game/ResultScreen.vue', () => {
  describe('with a guessed fruit', () => {
    const factory = () =>
      mountWith(ResultScreen, { props: { fruit: FRUITS.mango } })

    it('reveals the fruit name', () => {
      expect(factory().find('[data-testid="answer-text"]').text()).toBe(
        messages.en['fruit.mango']
      )
    })

    it('shows the label, image and disclaimer', () => {
      const wrapper = factory()

      expect(wrapper.find('[data-testid="answer-label"]').text()).toBe(
        messages.en['general.your-answer']
      )
      expect(
        wrapper.find('[data-testid="fruit-image"]').attributes('src')
      ).toBe('/images/fruits/1.png')
      expect(wrapper.find('[data-testid="wrong-answer"]').text()).toBe(
        `(${messages.en['general.or']} ${messages.en['general.wrong-answer']})`
      )
    })

    it('loads the reveal image eagerly — it is the point of the screen', () => {
      expect(
        factory().find('[data-testid="fruit-image"]').attributes('loading')
      ).toBe('eager')
    })
  })

  describe('when the answers did not add up', () => {
    const factory = () => mountWith(ResultScreen, { props: { fruit: null } })

    it('calls out the cheating instead of a fruit', () => {
      expect(factory().find('[data-testid="answer-text"]').text()).toBe(
        messages.en['general.wrong-answer']
      )
    })

    it('hides the label, image and disclaimer', () => {
      const wrapper = factory()

      expect(wrapper.find('[data-testid="answer-label"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="fruit-image"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="wrong-answer"]').exists()).toBe(false)
    })
  })

  it('emits restart from the play again button', async () => {
    const wrapper = mountWith(ResultScreen, { props: { fruit: FRUITS.mango } })

    await wrapper.find('[data-testid="play-again-button"]').trigger('click')

    expect(wrapper.emitted('restart')).toBeTruthy()
  })
})
