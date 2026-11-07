<script setup>
import { computed, ref } from 'vue'
import { fullAdder } from '../lib/logic.mjs'
const a = ref(0), b = ref(0), cin = ref(0)
const result = computed(() => fullAdder(a.value, b.value, cin.value))
function reset() { a.value = b.value = cin.value = 0 }
</script>
<template>
  <section class="lab full-adder-lab" aria-label="Full Adder Simulator" @keydown.stop @keyup.stop>
    <div class="lab-controls">
      <button :aria-pressed="!!a" aria-label="Toggle A" @click="a ^= 1">A = {{ a }}</button>
      <button :aria-pressed="!!b" aria-label="Toggle B" @click="b ^= 1">B = {{ b }}</button>
      <button :aria-pressed="!!cin" aria-label="Toggle Cin" @click="cin ^= 1">Cin = {{ cin }}</button>
      <button @click="reset">Reset</button>
    </div>
    <FullAdderDiagram :a="a" :b="b" :cin="cin" :sum="result.sum" :cout="result.cout" />
    <div class="lab-result" aria-live="polite"><output aria-label="Sum">Sum = {{ result.sum }}</output><output aria-label="Cout">Cout = {{ result.cout }}</output><span class="sum-identity">{{ a }} + {{ b }} + {{ cin }} = 2 × {{ result.cout }} + {{ result.sum }}</span></div>
    <div class="lab-equation">Sum = A ⊕ B ⊕ Cin<br>Cout = (A · B) + (Cin · (A ⊕ B))</div>
    <p class="hint">1-bit unsigned · Cout은 다음 비트 carry이며 signed overflow와 별도입니다.<br>A=B=1: carry 생성 · A≠B: carry 전달입니다.</p>
  </section>
</template>
