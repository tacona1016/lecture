<script setup>
import { computed, ref } from 'vue'
import { gates, logicGate } from '../lib/logic.mjs'
const selected = ref('AND'), a = ref(0), b = ref(0)
const y = computed(() => logicGate(selected.value, a.value, b.value))
function reset() { selected.value = 'AND'; a.value = 0; b.value = 0 }
</script>
<template>
  <section class="lab" aria-label="Logic Gate Simulator" @keydown.stop>
    <div class="lab-controls">
      <label>Gate <select v-model="selected" aria-label="Gate"><option v-for="(_, name) in gates" :key="name">{{ name }}</option></select></label>
      <button :aria-pressed="!!a" aria-label="Toggle A" @click="a ^= 1">A = {{ a }}</button>
      <button :aria-pressed="!!b" aria-label="Toggle B" @click="b ^= 1">B = {{ b }}</button>
      <button @click="reset">Reset</button>
    </div>
    <div class="lab-result" aria-live="polite"><span class="lab-equation">{{ gates[selected].expression }}</span><output aria-label="Y">Y = {{ y }}</output><span>{{ y ? 'HIGH' : 'LOW' }}</span></div>
    <table aria-label="Selected gate truth table">
      <thead><tr><th>A</th><th>B</th><th>Y ({{ selected }})</th></tr></thead>
      <tbody><tr v-for="n in [0, 1, 2, 3]" :key="n" :style="{ color: a === (n >> 1) && b === (n & 1) ? '#55dcf1' : '' }"><td>{{ n >> 1 }}</td><td>{{ n & 1 }}</td><td>{{ logicGate(selected, n >> 1, n & 1) }}</td></tr></tbody>
    </table>
    <p class="hint">이상적인 2입력 조합논리입니다. +는 OR입니다. Tab으로 이동하고 Space로 입력을 바꾸세요.</p>
  </section>
</template>
