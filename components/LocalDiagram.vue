<script setup>
import { computed, useId } from 'vue'
import { diagramArtwork } from '../lib/diagram-artwork.mjs'
const props = defineProps({ src: { type: String, required: true }, alt: { type: String, required: true }, tall: Boolean })
const instanceId = useId()
const artwork = computed(() => diagramArtwork(props.src, instanceId))
</script>
<template><div role="img" :aria-label="alt" :data-diagram="src" class="diagram" :class="{ tall }" v-html="artwork" /></template>
