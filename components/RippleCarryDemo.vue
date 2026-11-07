<script setup>
import { rippleTrace } from '../lib/presentation.mjs'
defineProps({ step: { type: Number, default: 0 } })
const trace = rippleTrace(7, 1)
const labels = [
  'LSB → MSB 방향의 carry 경로를 먼저 확인합니다.',
  'A=0111, B=0001, c₀=0을 각 1-bit stage에 배치합니다.',
  'Bit 0: 1+1+0=2 → S₀=0, c₁=1입니다.',
  'Bit 1: 전달된 c₁=1을 더해 S₁=0, c₂=1입니다.',
  'Bit 2: 전달된 c₂=1을 더해 S₂=0, c₃=1입니다.',
  'Bit 3: 0+0+1=1 → S₃=1, c₄=0입니다.',
  'S₃S₂S₁S₀=1000, unsigned carry=0, signed overflow=1입니다.',
]
</script>
<template>
  <section class="engineering-viz" aria-label="Four-bit ripple carry walkthrough" :data-step="step">
    <svg viewBox="0 0 900 240" class="presenter-diagram ripple-diagram" role="img" aria-label="Four full adders arranged from bit zero at left to bit three at right">
      <g v-for="row in trace.stages" :key="row.i" :data-bit="row.i" :data-sum="step >= row.i + 2 ? row.sum : '?'" :data-carry="step >= row.i + 2 ? row.cout : '?'">
        <rect :x="95 + row.i * 200" y="70" width="145" height="100" rx="8" :class="['fa-stage', {active: step === row.i + 2, complete: step >= row.i + 2}]" />
        <text :x="167 + row.i * 200" y="111" text-anchor="middle" class="svg-title">FA {{ row.i }}</text>
        <text :x="167 + row.i * 200" y="140" text-anchor="middle" class="svg-label">{{ row.i === 0 ? 'LSB' : row.i === 3 ? 'MSB' : '1 bit' }}</text>
        <path :d="`M${125 + row.i * 200} 42V70M${210 + row.i * 200} 42V70`" class="signal-wire" />
        <text :x="125 + row.i * 200" y="31" text-anchor="middle" class="svg-label">A{{ row.i }}={{ step >= 1 ? row.a : '?' }}</text>
        <text :x="210 + row.i * 200" y="31" text-anchor="middle" class="svg-label">B{{ row.i }}={{ step >= 1 ? row.b : '?' }}</text>
        <path :d="`M${row.i === 0 ? 22 : 40 + row.i * 200} 120H${95 + row.i * 200}`" :class="['signal-wire', {energized: step >= row.i + 1}]" />
        <text :x="57 + row.i * 200" y="99" text-anchor="middle" class="svg-label">c{{ row.i }}={{ step >= row.i + 1 ? row.cin : '?' }}</text>
        <path :d="`M${167 + row.i * 200} 170V193`" :class="['signal-wire', {energized: step >= row.i + 2}]" />
        <text :x="167 + row.i * 200" y="222" text-anchor="middle" :class="['svg-value', {muted:step < row.i+2}]">S{{ row.i }}={{ step >= row.i+2 ? row.sum : '?' }}</text>
      </g>
      <path d="M840 120H885" :class="['signal-wire',{energized:step >= 5}]" />
      <text x="865" y="99" text-anchor="middle" class="svg-label">c4={{ step >= 5 ? trace.carry : '?' }}</text>
    </svg>
    <StageCaption :step="step" :labels="labels" />
    <p class="model-note">4-bit, c₀=0의 논리 계산입니다. 클릭 단계는 실제 게이트 지연이나 SPICE 파형이 아닙니다.</p>
  </section>
</template>
