import { computed, readonly, ref } from 'vue'
import { ANSWERS, ROUND_FRUITS } from '@/constants/fruits'
import { useSound } from '@/composables/useSound'

export const PHASE = {
  Intro: 'intro',
  Board: 'board',
  Question: 'question',
  Result: 'result',
}

const INTRO_ROUND = -1
const BOARD_ROUND = 0
/** Rounds 1..N are the questions; the map also holds round 0 (the board). */
export const TOTAL_QUESTIONS = ROUND_FRUITS.size - 1
const RESULT_ROUND = TOTAL_QUESTIONS + 1

/**
 * The whole game as a small state machine: a round counter plus a score.
 * Components read derived state and call intents — they never touch the counter.
 */
export function useGame() {
  const { play } = useSound()

  const round = ref(INTRO_ROUND)
  const score = ref(0)

  const phase = computed(() => {
    if (round.value <= INTRO_ROUND) {
      return PHASE.Intro
    }

    if (round.value === BOARD_ROUND) {
      return PHASE.Board
    }

    return round.value >= RESULT_ROUND ? PHASE.Result : PHASE.Question
  })

  /** Fruits on screen for the current round — i18n keys, not display names. */
  const fruits = computed(() => ROUND_FRUITS.get(round.value) ?? [])

  const questionNumber = computed(() =>
    phase.value === PHASE.Question ? round.value : 0
  )

  const progress = computed(() =>
    Math.round((questionNumber.value / TOTAL_QUESTIONS) * 100)
  )

  /** The fruit the score maps to, or `null` when the answers were inconsistent. */
  const result = computed(() => ANSWERS.get(score.value) ?? null)

  function start() {
    round.value = BOARD_ROUND
    score.value = 0
    play('start')
  }

  function advance() {
    round.value++

    if (phase.value === PHASE.Question) {
      play('start')
    }

    if (phase.value === PHASE.Result) {
      play('success')
    }
  }

  /** Answer the current question — "yes" folds the round into the score. */
  function answer(isPresent) {
    if (phase.value !== PHASE.Question) {
      return
    }

    if (isPresent) {
      score.value += round.value
    }

    advance()
  }

  /** Leave the board and start asking questions. */
  function next() {
    if (phase.value === PHASE.Board) {
      advance()
    }
  }

  /** Step back from the board to the intro screen. */
  function previous() {
    if (round.value > INTRO_ROUND) {
      round.value--
    }
  }

  function reset() {
    round.value = INTRO_ROUND
    score.value = 0
  }

  return {
    round: readonly(round),
    score: readonly(score),
    phase,
    fruits,
    questionNumber,
    totalQuestions: TOTAL_QUESTIONS,
    progress,
    result,
    start,
    answer,
    next,
    previous,
    reset,
  }
}
