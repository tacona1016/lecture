<script setup>
defineProps({ src: { type: String, required: true }, alt: { type: String, required: true }, tall: Boolean })
const base = import.meta.env.BASE_URL
</script>
<template><img :src="`${base}${src}`" :alt="alt" class="diagram" :class="{ tall }" /></template>
