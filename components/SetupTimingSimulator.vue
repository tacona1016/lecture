<script setup>
import { computed, reactive } from 'vue'
import { setupTiming } from '../lib/logic.mjs'
const initial = { tclk: 10, tcq: 1, comb: 7, setup: 1, skew: 0, uncertainty: 0.5 }
const values = reactive({ ...initial })
const fields = [
  { key: 'tclk', label: 'Tclk', min: 1, max: 20 },
  { key: 'tcq', label: 'Tcq_max', min: 0, max: 3 },
  { key: 'comb', label: 'Tcomb_max', min: 0, max: 15 },
  { key: 'setup', label: 'Tsetup', min: 0, max: 3 },
  { key: 'skew', label: 'Capture − Launch Skew', min: -3, max: 3 },
  { key: 'uncertainty', label: 'Setup Uncertainty', min: 0, max: 3 },
]
const result = computed(() => setupTiming(values))
</script>
<template>
  <section class="lab setup-lab" aria-label="Setup Timing Simulator" @keydown.stop @keyup.stop>
    <div class="timing-grid">
      <label v-for="f in fields" :key="f.key"><span class="slider-label"><span>{{ f.key==='skew'?'Skew = C−L':f.label }}</span><b>{{ values[f.key].toFixed(1) }} ns</b></span>
        <input v-model.number="values[f.key]" type="range" :aria-label="f.label" :min="f.min" :max="f.max" step="0.1">
      </label>
    </div>
    <SetupTimeline :values="values" compact />
    <div class="lab-result" aria-live="polite"><output :class="result.pass ? 'pass' : 'fail'" aria-label="Setup result">{{ result.pass ? 'PASS' : 'VIOLATION' }} · {{ result.slack.toFixed(1) }} ns</output><button @click="Object.assign(values, initial)">Reset</button></div>
    <div class="lab-equation">slack = Tclk + skew − (Tcq_max + Tcomb_max + Tsetup + U)</div>
    <div class="timing-readout"><span>Arrival {{ result.arrival.toFixed(1) }} ns</span><span>Required {{ result.required.toFixed(1) }} ns</span><span>Slack = Required − Arrival</span></div>
    <p class="hint">Setup 전용·동일 주파수/에지 · Skew −0.5 / −0.6 ns 비교 · 0 ns=경계 PASS(여유 없음).</p>
  </section>
</template>
