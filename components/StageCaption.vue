<script setup>
import { computed } from 'vue'
const props = defineProps({ step: Number, labels: { type: Array, required: true } })
const current = computed(() => Math.min(Math.max(0, props.step || 0), props.labels.length - 1))
</script>
<template>
  <div class="stage-caption" :data-stage="current" aria-live="polite">
    <span class="stage-badge">{{ current }} / {{ labels.length - 1 }}</span><p>{{ labels[current] }}</p>
  </div>
</template>
