<script setup>
import { computed } from 'vue'
const props = defineProps({ gate: String, a: Number, b: Number, y: Number })
const curved = computed(() => ['OR','NOR','XOR','XNOR'].includes(props.gate))
const xor = computed(() => ['XOR','XNOR'].includes(props.gate))
const inverted = computed(() => ['NAND','NOR','XNOR'].includes(props.gate))
const tip = computed(() => curved.value ? 293 : 287)
</script>
<template>
  <svg viewBox="0 0 430 180" class="presenter-diagram gate-symbol" role="img" :aria-label="`${gate} gate: A ${a}, B ${b}, Y ${y}`">
    <g :class="a?'logic-high':'logic-low'"><path :d="`M90 50H${curved?166:160}`" class="logic-wire"/><text x="42" y="35" text-anchor="middle" class="svg-title">A={{ a }}</text><text x="42" y="72" text-anchor="middle" class="svg-label">{{ a?'HIGH':'LOW' }}</text></g>
    <g :class="b?'logic-high':'logic-low'"><path :d="`M90 120H${curved?166:160}`" class="logic-wire"/><text x="42" y="112" text-anchor="middle" class="svg-title">B={{ b }}</text><text x="42" y="151" text-anchor="middle" class="svg-label">{{ b?'HIGH':'LOW' }}</text></g>
    <path v-if="curved" d="M155 20Q185 85 155 150Q245 150 293 85Q245 20 155 20Z" class="gate-outline"/>
    <path v-else d="M160 20H222A65 65 0 0 1 222 150H160Z" class="gate-outline"/>
    <path v-if="xor" d="M143 20Q173 85 143 150" class="gate-outline xor-arc"/>
    <circle v-if="inverted" :cx="tip+7" cy="85" r="7" class="gate-outline"/>
    <g :class="y?'logic-high':'logic-low'"><path :d="`M${tip+(inverted?14:0)} 85H350`" class="logic-wire"/><text x="387" y="75" text-anchor="middle" class="svg-title">Y={{ y }}</text><text x="387" y="114" text-anchor="middle" class="svg-label">{{ y?'HIGH':'LOW' }}</text></g>
    <text x="218" y="175" text-anchor="middle" class="svg-label">{{ gate }}</text>
  </svg>
</template>
