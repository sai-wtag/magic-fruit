import { describe, expect, it } from 'vitest'
import { mountWith } from '~~/tests/utils/mount'
import GameScreen from '@/components/game/GameScreen.vue'
import { TOTAL_QUESTIONS } from '@/composables/useGame'
import { ROUND_FRUITS } from '@/constants/fruits'

const screen = (wrapper, name) =>
  wrapper.find(`[data-testid="${name}-screen"]`).exists()

async function answer(wrapper, isPresent) {
  await wrapper
    .find(`[data-testid="${isPresent ? 'yes' : 'no'}-button"]`)
    .trigger('click')
}

describe('@/components/game/GameScreen.vue', () => {
  it('opens on the intro', () => {
    const wrapper = mountWith(GameScreen)

    expect(screen(wrapper, 'intro')).toBe(true)
  })

  it('walks intro -> board -> questions -> result', async () => {
    const wrapper = mountWith(GameScreen)

    await wrapper.find('[data-testid="start-button"]').trigger('click')
    expect(screen(wrapper, 'board')).toBe(true)

    await wrapper.find('[data-testid="next-button"]').trigger('click')
    expect(screen(wrapper, 'question')).toBe(true)

    for (let round = 1; round <= TOTAL_QUESTIONS; round++) {
      await answer(wrapper, false)
    }

    expect(screen(wrapper, 'result')).toBe(true)
  })

  it('goes back to the intro from the board', async () => {
    const wrapper = mountWith(GameScreen)

    await wrapper.find('[data-testid="start-button"]').trigger('click')
    await wrapper.find('[data-testid="back-button"]').trigger('click')

    expect(screen(wrapper, 'intro')).toBe(true)
  })

  it('reveals the fruit the player was thinking of', async () => {
    const wrapper = mountWith(GameScreen)
    const fruit = ROUND_FRUITS.get(0).find(({ name }) => name === 'fruit.mango')

    await wrapper.find('[data-testid="start-button"]').trigger('click')
    await wrapper.find('[data-testid="next-button"]').trigger('click')

    for (let round = 1; round <= TOTAL_QUESTIONS; round++) {
      await answer(wrapper, ROUND_FRUITS.get(round).includes(fruit))
    }

    expect(wrapper.find('[data-testid="answer-text"]').text()).toBe('Mango')
  })

  it('restarts from the result screen', async () => {
    const wrapper = mountWith(GameScreen)

    await wrapper.find('[data-testid="start-button"]').trigger('click')
    await wrapper.find('[data-testid="next-button"]').trigger('click')

    for (let round = 1; round <= TOTAL_QUESTIONS; round++) {
      await answer(wrapper, true)
    }

    await wrapper.find('[data-testid="play-again-button"]').trigger('click')

    expect(screen(wrapper, 'board')).toBe(true)
  })
})
