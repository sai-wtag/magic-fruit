<template>
  <Transition name="page" mode="out-in">
    <IntroScreen v-if="game.phase === PHASE.Intro" key="intro" @start="game.start" />

    <BoardScreen
      v-else-if="game.phase === PHASE.Board"
      key="board"
      :fruits="game.fruits"
      @back="game.previous"
      @next="game.next" />

    <QuestionScreen
      v-else-if="game.phase === PHASE.Question"
      :key="`question-${game.round}`"
      :round="game.questionNumber"
      :total-rounds="game.totalQuestions"
      :progress="game.progress"
      :fruits="game.fruits"
      @answer="game.answer" />

    <ResultScreen
      v-else
      key="result"
      :fruit="game.result"
      @restart="game.start" />
  </Transition>
</template>

<script setup>
import { reactive } from 'vue'
import { PHASE, useGame } from '@/composables/useGame'
import IntroScreen from '@/components/game/IntroScreen.vue'
import BoardScreen from '@/components/game/BoardScreen.vue'
import QuestionScreen from '@/components/game/QuestionScreen.vue'
import ResultScreen from '@/components/game/ResultScreen.vue'

// `reactive` unwraps the refs so the template reads `game.phase`, not `.value`.
const game = reactive(useGame())
</script>
