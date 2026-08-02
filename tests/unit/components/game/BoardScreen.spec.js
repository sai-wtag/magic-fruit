import { describe, expect, it } from 'vitest'
import { mountWith, messages } from '@/tests/utils/mount'
import BoardScreen from '@/components/game/BoardScreen.vue'
import { ALL_FRUITS } from '@/constants/fruits'

const factory = () => mountWith(BoardScreen, { props: { fruits: ALL_FRUITS } })

describe('@/components/game/BoardScreen.vue', () => {
  it('asks the player to pick a fruit', () => {
    expect(factory().find('[data-testid="board-title"]').text()).toBe(
      messages.en['fruit.pick-fruit']
    )
  })

  it('shows the whole catalogue', () => {
    expect(factory().findAll('[data-testid="fruit"]')).toHaveLength(
      ALL_FRUITS.length
    )
  })

  it.each([
    ['back-button', 'back'],
    ['next-button', 'next'],
  ])('emits "%s" -> "%s"', async (testId, event) => {
    const wrapper = factory()

    await wrapper.find(`[data-testid="${testId}"]`).trigger('click')

    expect(wrapper.emitted(event)).toBeTruthy()
  })
})
