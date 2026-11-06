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
  <section class="lab" aria-label="Setup Timing Simulator" @keydown.stop>
    <div class="timing-grid">
      <label v-for="f in fields" :key="f.key">{{ f.label }}: {{ values[f.key].toFixed(1) }} ns
        <input v-model.number="values[f.key]" type="range" :aria-label="f.label" :min="f.min" :max="f.max" step="0.1">
      </label>
    </div>
    <div class="lab-result" aria-live="polite"><output :class="result.pass ? 'pass' : 'fail'" aria-label="Setup result">{{ result.pass ? 'PASS' : 'VIOLATION' }} · {{ result.slack.toFixed(1) }} ns</output><button @click="Object.assign(values, initial)">Reset</button></div>
    <div class="lab-equation">slack = Tclk + skew − (Tcq_max + Tcomb_max + Tsetup + U)</div>
    <p class="hint">Arrival = {{ result.arrival.toFixed(1) }} ns · Required = {{ result.required.toFixed(1) }} ns · Slack = Required − Arrival</p>
    <p class="hint">동일 주파수·동일 상승 에지의 단일 경로 모델입니다. 0 ns는 경계 PASS이며 여유가 없습니다. Hold는 별도의 min delay 분석입니다.</p>
  </section>
</template>
