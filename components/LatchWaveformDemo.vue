<script setup>
defineProps({ step: { type: Number, default: 0 } })
const labels = ['D와 공통 시간 기준을 먼저 읽습니다.', 'EN=1인 두 구간이 latch의 transparency window입니다.', 'Latch Q는 window 안에서 D의 변화를 따라갑니다.', '상승 에지 t1·t6에서만 D를 읽으면 FF Q가 됩니다.', '이 그림은 Tcq=0의 이상 모델입니다. 실제 Q는 clock-to-Q 뒤에 변합니다.']
</script>
<template>
  <section class="engineering-viz" aria-label="Latch and flip-flop waveform walkthrough" :data-step="step">
    <svg viewBox="0 0 900 285" class="presenter-diagram latch-diagram" role="img" aria-label="D, enable, latch output and flip-flop output on a common ideal time axis">
      <g v-if="step>=1" class="transparency-windows"><rect x="215" y="90" width="195" height="105"/><rect x="540" y="90" width="195" height="105"/></g>
      <g class="wave-labels"><text x="8" y="69">EN / CLK</text><text x="8" y="124">D</text><text x="8" y="179">Latch Q</text><text x="8" y="234">FF Q</text></g>
      <path d="M150 72H215V48H410V72H540V48H735V72H820" :class="['wave-line',{energized:step>=1}]"/>
      <path d="M150 127H280V103H345V127H475V103H605V127H820" class="wave-line energized"/>
      <path v-if="step>=2" d="M150 182H280V158H345V182H540V158H605V182H820" class="wave-line energized" data-wave="latch"/>
      <path v-if="step>=3" d="M150 237H540V213H820" class="wave-line energized" data-wave="ff"/>
      <g v-if="step>=3" class="sampling-edges"><path d="M215 22V245M540 22V245"/><circle cx="215" cy="127" r="6"/><circle cx="540" cy="103" r="6"/><text x="215" y="18" text-anchor="middle">sample 0</text><text x="540" y="18" text-anchor="middle">sample 1</text></g>
      <g class="svg-label"><text x="215" y="272" text-anchor="middle">t1</text><text x="410" y="272" text-anchor="middle">t4</text><text x="540" y="272" text-anchor="middle">t6</text><text x="735" y="272" text-anchor="middle">t9</text></g>
    </svg>
    <StageCaption :step="step" :labels="labels" />
    <p class="model-note">초기 Q=0 · enable active-high · FF CLK↑ · setup/hold 충족 · 이상적인 파형입니다.</p>
  </section>
</template>
