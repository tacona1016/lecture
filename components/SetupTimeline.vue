<script setup>
import { computed } from 'vue'
import { setupGeometry } from '../lib/presentation.mjs'
const props = defineProps({ values: { type: Object, required: true }, stage: { type: Number, default: 7 }, compact: Boolean })
const g = computed(() => setupGeometry(props.values))
const f = n => n.toFixed(1)
</script>
<template>
  <svg viewBox="0 0 900 230" :class="['presenter-diagram setup-timeline',{compact}]" role="img" aria-label="Setup timeline in ns: launch, capture, maximum data arrival, setup required time and signed slack" :data-arrival="g.arrival" :data-required="g.required" :data-slack="g.slack" :data-domain-min="g.min" :data-domain-max="g.max">
    <g v-if="stage>=6"><rect :x="g.requiredX" y="53" :width="Math.max(1,g.captureX-g.requiredX)" height="130" class="setup-window"/></g>
    <path d="M78 192H822" class="axis-line"/>
    <g v-for="(tick,i) in g.ticks" :key="i"><path :d="`M${tick.x} 189V197`" class="axis-line"/><text :x="tick.x" y="221" text-anchor="middle" class="axis-label">{{ f(tick.value) }}</text></g>
    <text x="858" y="221" class="axis-label">ns</text>
    <g v-if="stage>=1"><path :d="`M${g.launchX} 34V192`" class="edge-line"/><text :x="g.launchX" y="23" text-anchor="middle" class="svg-label">Launch 0</text></g>
    <g v-if="stage>=2"><rect :x="g.launchX" y="79" :width="Math.max(1,g.tcqX-g.launchX)" height="26" class="tcq-segment"/><text v-if="g.tcqX-g.launchX>70" :x="(g.launchX+g.tcqX)/2" y="68" text-anchor="middle" class="svg-label">Tcq</text></g>
    <g v-if="stage>=3"><rect :x="g.tcqX" y="79" :width="Math.max(1,g.arrivalX-g.tcqX)" height="26" class="comb-segment"/><text v-if="g.arrivalX-g.tcqX>115" :x="(g.tcqX+g.arrivalX)/2" y="68" text-anchor="middle" class="svg-label">Tcomb_max</text></g>
    <g v-if="stage>=4"><path :d="`M${g.arrivalX} 79V136`" class="arrival-line"/><circle :cx="g.arrivalX" cy="105" r="5" class="arrival-dot"/><text :x="g.arrivalX" y="156" text-anchor="middle" class="svg-label">Arrival {{ f(g.arrival) }}</text></g>
    <g v-if="stage>=5"><path :d="`M${g.captureX} 39V192`" class="capture-line"/><text :x="g.captureX" y="43" text-anchor="middle" class="svg-label">Capture {{ f(g.capture) }}</text></g>
    <g v-if="stage>=6"><path :d="`M${g.requiredX} 55V192`" class="required-line"/><text :x="g.requiredX" y="184" text-anchor="middle" class="svg-label">Required {{ f(g.required) }}</text></g>
    <g v-if="stage>=7"><rect :x="g.slackX" y="112" :width="Math.max(3,g.slackWidth)" height="14" :class="g.pass?'slack-pass':'slack-fail'"/><text v-if="!compact" x="850" y="116" text-anchor="end" :class="['slack-label',g.pass?'pass-text':'fail-text']">{{ g.pass?'PASS':'VIOLATION' }} {{ f(g.slack) }} ns</text></g>
  </svg>
</template>
