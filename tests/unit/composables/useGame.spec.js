import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { PHASE, TOTAL_QUESTIONS, useGame } from '@/composables/useGame'
import { ALL_FRUITS, ANSWERS, ROUND_FRUITS } from '@/constants/fruits'

/** Plays a full game as someone who honestly picked `fruit`. */
function playHonestly(game, fruit) {
  game.start()
  game.next()

  for (let round = 1; round <= TOTAL_QUESTIONS; round++) {
    game.answer(ROUND_FRUITS.get(round).includes(fruit))
  }

  return game
}

describe('@/composables/useGame', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('phases', () => {
    it('starts on the intro screen with no score', () => {
      const game = useGame()

      expect(game.phase.value).toBe(PHASE.Intro)
      expect(game.score.value).toBe(0)
      expect(game.fruits.value).toEqual([])
    })

    it('shows the full board after starting', () => {
      const game = useGame()

      game.start()

      expect(game.phase.value).toBe(PHASE.Board)
      expect(game.fruits.value).toEqual(ALL_FRUITS)
    })

    it('moves from the board into the questions', () => {
      const game = useGame()

      game.start()
      game.next()

      expect(game.phase.value).toBe(PHASE.Question)
      expect(game.questionNumber.value).toBe(1)
      expect(game.fruits.value).toEqual(ROUND_FRUITS.get(1))
    })

    it('goes back to the intro from the board', () => {
      const game = useGame()

      game.start()
      game.previous()

      expect(game.phase.value).toBe(PHASE.Intro)
    })

    it(`reaches the result after ${TOTAL_QUESTIONS} questions`, () => {
      const game = useGame()

      game.start()
      game.next()

      for (let round = 1; round <= TOTAL_QUESTIONS; round++) {
        expect(game.phase.value).toBe(PHASE.Question)
        game.answer(false)
      }

      expect(game.phase.value).toBe(PHASE.Result)
    })

    it('ignores answers outside a question round', () => {
      const game = useGame()

      game.start()
      game.answer(true)

      expect(game.phase.value).toBe(PHASE.Board)
      expect(game.score.value).toBe(0)
    })
  })

  describe('scoring', () => {
    it('adds the round number for every "yes"', () => {
      const game = useGame()

      game.start()
      game.next()
      game.answer(true) // round 1
      game.answer(false) // round 2
      game.answer(true) // round 3

      expect(game.score.value).toBe(4)
    })

    it.each(ALL_FRUITS.map(fruit => [fruit.name, fruit]))(
      'guesses "%s" correctly',
      (_name, fruit) => {
        const game = playHonestly(useGame(), fruit)

        expect(game.phase.value).toBe(PHASE.Result)
        expect(game.score.value).toBe(
          [...ANSWERS.entries()].find(([, f]) => f === fruit)[0]
        )
        expect(game.result.value).toEqual(fruit)
      }
    )

    it('has no result when the answers do not add up', () => {
      const game = useGame()

      game.start()
      game.next()

      for (let round = 1; round <= TOTAL_QUESTIONS; round++) {
        game.answer(false)
      }

      expect(game.result.value).toBeNull()
    })
  })

  describe('progress', () => {
    it('is 0% before the first question', () => {
      const game = useGame()

      expect(game.progress.value).toBe(0)
    })

    it('reaches 100% on the last question', () => {
      const game = useGame()

      game.start()
      game.next()

      for (let round = 1; round < TOTAL_QUESTIONS; round++) {
        game.answer(false)
      }

      expect(game.questionNumber.value).toBe(TOTAL_QUESTIONS)
      expect(game.progress.value).toBe(100)
    })
  })

  describe('reset', () => {
    it('returns to the intro and clears the score', () => {
      const game = playHonestly(useGame(), ALL_FRUITS[0])

      game.reset()

      expect(game.phase.value).toBe(PHASE.Intro)
      expect(game.score.value).toBe(0)
    })
  })
})
