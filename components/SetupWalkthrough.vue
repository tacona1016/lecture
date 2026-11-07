<script setup>
defineProps({ step: { type: Number, default: 0 } })
const values = {tclk:10,tcq:1,comb:7,setup:1,skew:0.5,uncertainty:0.5}
const labels = ['동일 주파수·동일 상승 에지의 단일 cycle 경로입니다.', 'Launch clock 도착을 시간 0 ns로 둡니다.', 'FF가 Tcq_max=1 ns 뒤에 데이터를 내보냅니다.', '조합 경로가 최대 7 ns를 더 소비합니다.', 'Data Arrival=1+7=8 ns입니다.', '다음 Capture Edge=10+0.5=10.5 ns입니다.', 'Required=10.5−1−0.5=9 ns입니다.', 'Slack=Required−Arrival=9−8=+1 ns, setup PASS입니다.']
</script>
<template>
  <section class="engineering-viz" aria-label="Setup timing seven-step walkthrough" :data-step="step">
    <div class="path-strip"><span>Launch FF</span><span>→ Tcq_max → Tcomb_max →</span><span>Capture FF</span></div>
    <SetupTimeline :values="values" :stage="step" />
    <StageCaption :step="step" :labels="labels" />
    <p class="model-note">모든 값은 ns · skew = capture − launch · setup uncertainty=0.5 ns · Hold는 별도 min 경로입니다.</p>
  </section>
</template>
