import { describe, expect, it } from 'vitest'
import { mountWith, messages } from '@/tests/utils/mount'
import QuestionScreen from '@/components/game/QuestionScreen.vue'
import { ROUND_FRUITS } from '@/constants/fruits'

function factory(props = {}) {
  return mountWith(QuestionScreen, {
    props: {
      round: 1,
      totalRounds: 7,
      progress: 14,
      fruits: ROUND_FRUITS.get(1),
      ...props,
    },
  })
}

describe('@/components/game/QuestionScreen.vue', () => {
  it.each([
    [1, 'fruit.confirmation'],
    [2, 'fruit.available'],
    [3, 'fruit.here'],
    [7, 'fruit.here'],
  ])('asks the right question on round %s', (round, key) => {
    const wrapper = factory({ round })

    expect(wrapper.find('[data-testid="question-title"]').text()).toBe(
      messages.en[key]
    )
  })

  it('shows this round’s fruits', () => {
    const wrapper = factory()

    expect(wrapper.findAll('[data-testid="fruit"]')).toHaveLength(
      ROUND_FRUITS.get(1).length
    )
  })

  it('shows the round progress', () => {
    const wrapper = factory({ round: 3, progress: 43 })

    expect(wrapper.find('[data-testid="round-progress"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="round-progress-label"]').text()).toBe(
      'Question 3 of 7'
    )
  })

  it.each([
    ['yes-button', true],
    ['no-button', false],
  ])('emits answer(%s) from the "%s"', async (testId, payload) => {
    const wrapper = factory()

    await wrapper.find(`[data-testid="${testId}"]`).trigger('click')

    expect(wrapper.emitted('answer')).toEqual([[payload]])
  })

  it('labels the answers with icons as well as text', () => {
    const wrapper = factory()

    expect(
      wrapper.find('[data-testid="yes-button"] [data-icon="check"]').exists()
    ).toBe(true)
    expect(
      wrapper.find('[data-testid="no-button"] [data-icon="x"]').exists()
    ).toBe(true)
  })

  it('keeps the answers in a fixed bottom bar for one-handed play', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-testid="action-bar"]').classes()).toEqual(
      expect.arrayContaining(['fixed', 'bottom-0'])
    )
  })
})
