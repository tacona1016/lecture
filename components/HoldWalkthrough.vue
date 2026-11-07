<script setup>
import { holdSlack } from '../lib/logic.mjs'
defineProps({ step: { type: Number, default: 0 } })
const slack = holdSlack({tcqMin:0.2,combMin:0.3,hold:0.2,skew:0.4,uncertainty:0.1})
const labels = ['Hold는 같은 번호 에지 사이의 가장 빠른 데이터 경로입니다.', 'Tcq_min 0.2 + Tcomb_min 0.3 → Arrival_min=0.5 ns입니다.', 'Capture는 +0.4 ns에 도착하고 0.2+0.1 ns 동안 유지가 필요합니다.', 'Required_hold=0.7 ns보다 0.2 ns 빨라 hold VIOLATION입니다.', 'Period를 늘려도 같은 edge의 min-delay 조건은 바뀌지 않습니다.']
</script>
<template>
  <section class="engineering-viz" aria-label="Minimum delay hold timing walkthrough" :data-step="step">
    <div class="path-strip"><span>Launch FF</span><span>→ MIN delay path →</span><span>Capture FF · same edge</span></div>
    <svg viewBox="0 0 900 215" class="presenter-diagram hold-timeline" role="img" aria-label="Hold example: arrival 0.5 ns, capture 0.4 ns, hold required until 0.7 ns, slack minus 0.2 ns">
      <rect v-if="step>=2" x="460" y="37" width="210" height="127" class="setup-window"/>
      <path d="M100 170H820M180 28V170" class="axis-line"/><text x="180" y="20" text-anchor="middle" class="svg-label">Launch 0</text>
      <g v-for="(t,i) in [0,0.2,0.4,0.6,0.8]" :key="i"><path :d="`M${180+t*700} 166V177`" class="axis-line"/><text :x="180+t*700" y="205" text-anchor="middle" class="axis-label">{{ t.toFixed(1) }}</text></g><text x="840" y="205" class="axis-label">ns</text>
      <g v-if="step>=1"><rect x="180" y="67" width="140" height="26" class="tcq-segment"/><rect x="320" y="67" width="210" height="26" class="comb-segment"/><text x="248" y="57" text-anchor="middle" class="svg-label">Tcq_min</text><text x="425" y="57" text-anchor="middle" class="svg-label">Tcomb_min</text><path d="M530 67V118" class="arrival-line"/><text x="530" y="139" text-anchor="middle" class="svg-label">Arrival 0.5</text></g>
      <g v-if="step>=2"><path d="M460 34V170" class="capture-line"/><path d="M670 43V170" class="required-line"/><text x="460" y="31" text-anchor="middle" class="svg-label">Capture +0.4</text><text x="670" y="157" text-anchor="middle" class="svg-label">Required 0.7</text></g>
      <g v-if="step>=3"><rect x="530" y="100" width="140" height="14" class="slack-fail"/><text x="840" y="90" text-anchor="end" class="fail-text svg-label">{{ slack.toFixed(1) }} ns</text></g>
    </svg>
    <StageCaption :step="step" :labels="labels" />
    <p class="model-note">모든 값은 ns, Uₕ≥0입니다. Min 경로에 지연을 추가하면 hold를 개선할 수 있지만 setup도 다시 검사해야 합니다.</p>
  </section>
</template>
