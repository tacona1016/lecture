<script setup>
defineProps({ step: { type: Number, default: 0 } })
</script>
<template>
  <section class="quiz" :data-step="step" aria-label="Discussion quiz">
    <div class="quiz-questions"><slot /></div>
    <div v-click="1" class="quiz-answer" :aria-hidden="step < 1">
      <div class="quiz-label">ANSWER</div><slot name="answer" />
    </div>
    <div v-click="2" class="quiz-explanation" :aria-hidden="step < 2">
      <div class="quiz-label">WHY</div><slot name="explanation" />
    </div>
  </section>
</template>
