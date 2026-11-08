<script setup>
import { computed, useId } from 'vue'
import { diagramArtwork } from '../lib/diagram-artwork.mjs'
const props = defineProps({ mode: { type: String, default: 'hold' }, step: { type: Number, default: 0 } })
const cellArtwork = diagramArtwork('images/sram-6t.svg', useId(), true)
const q = computed(() => props.mode === 'write' && props.step >= 3 ? 1 : 0)
const wl = computed(() => props.mode === 'read' ? props.step >= 2 : props.mode === 'write' && props.step >= 2 && props.step < 4)
const labels = computed(() => ({
  hold: ['Q=0, QB=1인 저장 상태를 먼저 확인합니다.', 'WL=LOW이면 두 access NMOS가 OFF여서 bitline과 격리됩니다.', 'N1과 P2가 ON인 피드백이 Q=0, QB=1을 유지합니다.'],
  read: ['Q=0, QB=1입니다. BL/BLB는 complementary bitlines입니다.', 'WL=LOW에서 BL과 BLB를 모두 precharge/equalize합니다.', 'Precharge를 끄고 WL=HIGH로 access NMOS를 켭니다.', 'BL → AX1 → N1 → VSS 경로가 BL을 조금 낮춥니다.', 'Sense amplifier가 BL<BLB를 읽어 data 0을 판정합니다.'],
  write: ['기존 Q=0, QB=1을 Q=1, QB=0으로 바꿉니다.', 'Write driver가 먼저 BL=HIGH, BLB=LOW를 설정합니다.', 'WL=HIGH에서 BLB 쪽 경로가 QB를 낮추기 시작합니다.', '피드백이 반전되어 Q=1, QB=0이 됩니다.', 'WL을 LOW로 내린 뒤 driver를 해제하면 새 값을 유지합니다.'],
})[props.mode])
</script>
<template>
  <section class="engineering-viz sram-operation" :aria-label="`SRAM ${mode} walkthrough`" :data-mode="mode" :data-step="step" :data-q="q" :data-qb="1-q" :data-wl="Number(wl)">
    <div class="sram-signals"><span :class="wl?'level-high':'level-low'">WL {{ wl?'1 HIGH':'0 LOW' }}</span><span :class="q?'level-high':'level-low'">Q {{ q }} {{ q?'HIGH':'LOW' }}</span><span :class="!q?'level-high':'level-low'">QB {{ 1-q }} {{ !q?'HIGH':'LOW' }}</span><span>Access {{ wl?'ON':'OFF' }}</span></div>
    <svg viewBox="0 0 880 350" class="presenter-diagram sram-cell" role="img" aria-label="Validated six transistor bitcell with selected conduction paths overlaid; wiring and device polarities preserved">
      <g v-html="cellArtwork" />
      <g v-if="step>=1" fill="none" stroke-linejoin="round" stroke-linecap="round">
        <path d="M163 155V35H717V155" :class="wl?'selected-path':'inactive-path'" />
        <g v-if="mode==='hold'&&step>=2 || mode==='write'&&step>=3">
          <path v-if="q===0" d="M300 175V238H288V272H300V315M580 55V78H568V112H580V175" class="selected-path" />
          <path v-else d="M580 175V238H568V272H580V315M300 55V78H288V112H300V175" class="selected-path" />
        </g>
        <g v-if="mode==='read'&&step>=1"><path d="M85 65V175M795 65V175" class="selected-path" /></g>
        <path v-if="mode==='read'&&step>=3" d="M85 65V175H145V187H181V175H300V238H288V272H300V315" class="selected-path discharge-path" />
        <g v-if="mode==='write'&&step>=1&&step<4"><path d="M85 65V175" class="selected-path"/><path d="M795 65V175" class="inactive-path"/></g>
        <path v-if="mode==='write'&&step>=2&&step<4" d="M795 65V175H735V187H699V175H580" class="selected-path"/>
      </g>
    </svg>
    <div class="sram-periphery" :class="{pending:mode==='hold'||step<1}">
      <span v-if="mode==='read'">{{ step>=4?'ΔV = BLB − BL > 0 → Sense → Read 0':step>=3?'BL ↓ (small Δ) · BLB ≈ VDD':'BL = BLB = HIGH · Precharge disabled before WL↑' }}</span>
      <span v-else-if="mode==='write'">{{ step>=4?'Write driver released · new state held':'Write driver: BL = 1 HIGH · BLB = 0 LOW' }}</span>
    </div>
    <StageCaption :step="step" :labels="labels" />
    <p class="model-note">Amber=선택 경로 · 교육용 개념도이며 SPICE 해석이 아닙니다.</p>
  </section>
</template>
