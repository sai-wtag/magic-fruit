import { describe, expect, it } from 'vitest'
import { ALL_FRUITS, ANSWERS, ROUND_FRUITS } from '@/constants/fruits'
import { TOTAL_QUESTIONS } from '@/composables/useGame'

describe('@/constants/fruits', () => {
  it('gives every fruit a unique id', () => {
    const ids = ALL_FRUITS.map(({ id }) => id)

    expect(new Set(ids).size).toBe(ALL_FRUITS.length)
  })

  it('namespaces every fruit name as an i18n key', () => {
    ALL_FRUITS.forEach(({ name }) => expect(name).toMatch(/^fruit\./))
  })

  it('shows the whole catalogue on the board round', () => {
    expect(ROUND_FRUITS.get(0)).toEqual(ALL_FRUITS)
  })

  it('can identify every fruit — the sum of its rounds is its answer', () => {
    ALL_FRUITS.forEach(fruit => {
      const score = [...ROUND_FRUITS.keys()]
        .filter(round => round > 0 && ROUND_FRUITS.get(round).includes(fruit))
        .reduce((total, round) => total + round, 0)

      expect(ANSWERS.get(score)).toBe(fruit)
    })
  })

  it('maps every answer back to exactly one fruit', () => {
    expect(ANSWERS.size).toBe(ALL_FRUITS.length)
    expect(new Set(ANSWERS.values()).size).toBe(ALL_FRUITS.length)
  })

  it('only puts known fruits in a round', () => {
    ROUND_FRUITS.forEach(fruits => {
      fruits.forEach(fruit => expect(ALL_FRUITS).toContain(fruit))
    })
  })

  it('has one board round plus the question rounds', () => {
    expect(ROUND_FRUITS.size).toBe(TOTAL_QUESTIONS + 1)
  })
})
