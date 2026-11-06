<script setup>
defineProps({ number: String, elective: Boolean })
</script>
<template>
  <div class="chapter-meta">
    <span>CHAPTER {{ number }} <span v-if="elective">· ADVANCED / ELECTIVE</span></span>
    <Link to="toc">← Contents</Link>
  </div>
</template>
