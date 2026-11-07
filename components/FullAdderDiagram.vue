<script setup>
defineProps({ a: Number, b: Number, cin: Number, sum: Number, cout: Number })
</script>
<template>
  <svg viewBox="0 0 860 200" class="presenter-diagram full-adder-diagram" role="img" :aria-label="`Full adder: A ${a}, B ${b}, Cin ${cin}; Sum ${sum}, Cout ${cout}`">
    <rect x="305" y="30" width="220" height="142" rx="8" class="fa-stage complete"/><text x="415" y="91" text-anchor="middle" class="svg-title">FULL ADDER</text><text x="415" y="124" text-anchor="middle" class="svg-label">1 bit</text>
    <g v-for="(value,i) in [a,b,cin]" :key="i" :class="value?'logic-high':'logic-low'">
      <text x="18" :y="55+i*49" class="svg-title">{{ ['A','B','Cin'][i] }}={{ value }}</text><text x="135" :y="55+i*49" class="svg-label">{{ value?'HIGH':'LOW' }}</text><path :d="`M200 ${49+i*49}H305`" class="logic-wire"/>
    </g>
    <g :class="sum?'logic-high':'logic-low'"><path d="M525 65H685" class="logic-wire"/><text x="700" y="70" class="svg-title">Sum={{ sum }}</text><text x="700" y="98" class="svg-label">{{ sum?'HIGH':'LOW' }}</text></g>
    <g :class="cout?'logic-high':'logic-low'"><path d="M525 145H685" class="logic-wire carry-output"/><text x="700" y="150" class="svg-title">Cout={{ cout }}</text><text x="700" y="179" class="svg-label">{{ cout?'HIGH':'LOW' }}</text></g>
    <text x="590" y="187" text-anchor="middle" class="svg-label">carry → next bit</text>
  </svg>
</template>
